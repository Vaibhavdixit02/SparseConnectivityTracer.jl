"""
    TracerSparsityDetector <: ADTypes.AbstractSparsityDetector

Singleton struct for integration with the sparsity detection framework of ADTypes.jl.

# Example

```jldoctest
julia> using ADTypes, SparseConnectivityTracer

julia> ADTypes.jacobian_sparsity(diff, rand(4), TracerSparsityDetector())
3×4 SparseArrays.SparseMatrixCSC{Bool, UInt64} with 6 stored entries:
 1  1  ⋅  ⋅
 ⋅  1  1  ⋅
 ⋅  ⋅  1  1
```

```jldoctest
julia> using ADTypes, SparseConnectivityTracer

julia> f(x) = x[1] + x[2]*x[3] + 1/x[4];

julia> ADTypes.hessian_sparsity(f, rand(4), TracerSparsityDetector())
4×4 SparseArrays.SparseMatrixCSC{Bool, UInt64} with 3 stored entries:
 ⋅  ⋅  ⋅  ⋅
 ⋅  ⋅  1  ⋅
 ⋅  1  ⋅  ⋅
 ⋅  ⋅  ⋅  1
```
"""
struct TracerSparsityDetector <: ADTypes.AbstractSparsityDetector end

function ADTypes.jacobian_sparsity(f, x, ::TracerSparsityDetector)
    return pattern(f, JacobianTracer, x)
end

function ADTypes.jacobian_sparsity(f!, y, x, ::TracerSparsityDetector)
    return pattern(f!, y, JacobianTracer, x)
end

function ADTypes.hessian_sparsity(f, x, ::TracerSparsityDetector)
    return pattern(f, HessianTracer, x)
end