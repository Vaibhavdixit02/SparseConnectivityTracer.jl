using SparseConnectivityTracer: TapeSet, empty_tape
using Test

tape = empty_tape(Float64)
x = [TapeSet{Float64}(i * π, tape) for i in 1:5]
y = [union(x[i], x[i + 1]) for i in 1:4]
z = [union(union(y[i], y[i + 1]), y[i + 2]) for i in 1:2]
tape

z[1]

@test sort(collect(z[1])) == [π, 2π, 3π, 4π]
