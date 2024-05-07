struct TapeRecord{T}
    element::T
    child1::Int
    child2::Int
end

const Tape{T} = Vector{TapeRecord{T}}

function vcat_tapes(tape1::Tape{T}, tape2::Tape{T}) where {T}
    tape = vcat(tape1, tape2)
    n1 = length(tape1)
    for i in eachindex(tape2)
        ti = tape[n1 + i]
        c1 = ifelse(iszero(ti.child1), ti.child1, ti.child1 + n1)
        c2 = ifelse(iszero(ti.child2), ti.child2, ti.child2 + n1)
        tape[n1 + i] = TapeRecord(ti.element, c1, c2)
    end
    return tape
end

empty_tape(::Type{T}) where {T} = TapeRecord{T}[]  # TODO: add constants for common cases

"""
    TapeSet

A recursive set based on external tape storage.

!!! danger
    This type does not work yet.
"""
struct TapeSet{T<:Number}
    tape_index::Int
    tape::Tape{T}

    function TapeSet{T}(x::Number) where {T}
        tape = empty_tape(T)
        record = TapeRecord(convert(T, x), 0, 0)
        push!(tape, record)
        return new{T}(length(tape), tape)
    end

    function TapeSet{T}(x::Number, tape::Vector{TapeRecord{T}}) where {T}
        record = TapeRecord(convert(T, x), 0, 0)
        push!(tape, record)
        return new{T}(length(tape), tape)
    end

    function TapeSet{T}() where {T}
        tape = empty_tape(T)
        return new{T}(length(tape), tape)
    end

    function TapeSet{T}(ts1::TapeSet{T}, ts2::TapeSet{T}) where {T}
        if ts1.tape === ts2.tape  # use common tape
            tape = ts1.tape
            record = TapeRecord(zero(T), ts1.tape_index, ts2.tape_index)
            push!(tape, record)
            return new{T}(length(tape), tape)
        else  # merge tapes
            tape = vcat_tapes(ts1.tape, ts2.tape)
            record = TapeRecord(zero(T), ts1.tape_index, ts2.tape_index + length(ts1.tape))
            push!(tape, record)
            return new{T}(length(tape), tape)
        end
    end
end

function Base.show(io::IO, ts::TapeSet{T}) where {T}
    return print(
        io,
        "TapeSet{$T} located at tape index $(ts.tape_index) with record $(ts.tape[ts.tape_index])",
    )
end

Base.eltype(::Type{TapeSet{T}}) where {T} = T

Base.union(ts1::TapeSet{T}, ts2::TapeSet{T}) where {T} = TapeSet{T}(ts1, ts2)

function Base.collect(ts::TapeSet{T}) where {T}
    accumulator = Set{T}()
    collect_aux!(accumulator, ts.tape_index, ts.tape)
    return collect(accumulator)
end

function collect_aux!(
    accumulator::Set{T}, tape_index::Integer, tape::Vector{TapeRecord{T}}
) where {T}
    if !iszero(tape_index)
        record = tape[tape_index]
        if !iszero(record.element)
            push!(accumulator, record.element)
        else
            collect_aux!(accumulator, record.child1, tape)
            collect_aux!(accumulator, record.child2, tape)
        end
    end
    return nothing
end

## SCT tricks

function tracer(::Type{JacobianTracer{S}}, index::Integer; tape=nothing) where {S<:TapeSet}
    return JacobianTracer(S(index, tape))
end

function tracer(
    ::Type{ConnectivityTracer{S}}, index::Integer; tape=nothing
) where {S<:TapeSet}
    return ConnectivityTracer(S(index, tape))
end

function tracer(::Type{HessianTracer{S}}, index::Integer; tape=nothing) where {S<:TapeSet}
    I = eltype(S)
    return HessianTracer{S,I}(Dict{I,S}(index => S(tape)))
end
