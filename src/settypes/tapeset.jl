struct TapeRecord{T}
    element::T
    child1::Int
    child2::Int
end

"""
    TapeSet

A recursive set based on external tape storage.

!!! danger
    This type does not work yet.
"""
struct TapeSet{T<:Number}
    tape_index::Int
    tape::Vector{TapeRecord{T}}

    function TapeSet{T}(x::Number, tape::Vector{TapeRecord{T}}) where {T}
        record = TapeRecord(convert(T, x), 0, 0)
        push!(tape, record)
        return new{T}(length(tape), tape)
    end

    function TapeSet{T}(ts1::TapeSet{T}, ts2::TapeSet{T}) where {T}
        @assert ts1.tape === ts2.tape  # is this slow?
        record = TapeRecord(zero(T), ts1.tape_index, ts2.tape_index)
        push!(ts1.tape, record)
        return new{T}(length(ts1.tape), ts1.tape)
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
    record = tape[tape_index]
    if !iszero(record.element)
        push!(accumulator, record.element)
    else
        collect_aux!(accumulator, record.child1, tape)
        collect_aux!(accumulator, record.child2, tape)
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
