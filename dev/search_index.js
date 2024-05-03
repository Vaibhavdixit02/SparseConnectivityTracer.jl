var documenterSearchIndex = {"docs":
[{"location":"api/","page":"API Reference","title":"API Reference","text":"CurrentModule = Main\nCollapsedDocStrings = true","category":"page"},{"location":"api/#API-Reference","page":"API Reference","title":"API Reference","text":"","category":"section"},{"location":"api/","page":"API Reference","title":"API Reference","text":"","category":"page"},{"location":"api/#Interface","page":"API Reference","title":"Interface","text":"","category":"section"},{"location":"api/","page":"API Reference","title":"API Reference","text":"connectivity_pattern\njacobian_pattern\nhessian_pattern","category":"page"},{"location":"api/#SparseConnectivityTracer.connectivity_pattern","page":"API Reference","title":"SparseConnectivityTracer.connectivity_pattern","text":"connectivity_pattern(f, x)\nconnectivity_pattern(f, x, T)\n\nEnumerates inputs x and primal outputs y = f(x) and returns sparse matrix C of size (m, n) where C[i, j] is true if the compute graph connects the i-th entry in y to the j-th entry in x.\n\nThe type of index set S can be specified as an optional argument and defaults to BitSet.\n\nExample\n\njulia> x = rand(3);\n\njulia> f(x) = [x[1]^2, 2 * x[1] * x[2]^2, sign(x[3])];\n\njulia> connectivity_pattern(f, x)\n3×3 SparseArrays.SparseMatrixCSC{Bool, UInt64} with 4 stored entries:\n 1  ⋅  ⋅\n 1  1  ⋅\n ⋅  ⋅  1\n\n\n\n\n\nconnectivity_pattern(f!, y, x)\nconnectivity_pattern(f!, y, x, T)\n\nEnumerates inputs x and primal outputs y after f!(y, x) and returns sparse matrix C of size (m, n) where C[i, j] is true if the compute graph connects the i-th entry in y to the j-th entry in x.\n\nThe type of index set S can be specified as an optional argument and defaults to BitSet.\n\n\n\n\n\n","category":"function"},{"location":"api/#SparseConnectivityTracer.jacobian_pattern","page":"API Reference","title":"SparseConnectivityTracer.jacobian_pattern","text":"jacobian_pattern(f, x)\njacobian_pattern(f, x, T)\n\nCompute the sparsity pattern of the Jacobian of y = f(x).\n\nThe type of index set S can be specified as an optional argument and defaults to BitSet.\n\nExample\n\njulia> x = rand(3);\n\njulia> f(x) = [x[1]^2, 2 * x[1] * x[2]^2, sign(x[3])];\n\njulia> jacobian_pattern(f, x)\n3×3 SparseArrays.SparseMatrixCSC{Bool, UInt64} with 3 stored entries:\n 1  ⋅  ⋅\n 1  1  ⋅\n ⋅  ⋅  ⋅\n\n\n\n\n\njacobian_pattern(f!, y, x)\njacobian_pattern(f!, y, x, T)\n\nCompute the sparsity pattern of the Jacobian of f!(y, x).\n\nThe type of index set S can be specified as an optional argument and defaults to BitSet.\n\n\n\n\n\n","category":"function"},{"location":"api/#SparseConnectivityTracer.hessian_pattern","page":"API Reference","title":"SparseConnectivityTracer.hessian_pattern","text":"hessian_pattern(f, x)\nhessian_pattern(f, x, T)\n\nComputes the sparsity pattern of the Hessian of a scalar function y = f(x).\n\nThe type of index set S can be specified as an optional argument and defaults to BitSet.\n\nExample\n\njulia> x = rand(5);\n\njulia> f(x) = x[1] + x[2]*x[3] + 1/x[4] + 1*x[5];\n\njulia> hessian_pattern(f, x)\n5×5 SparseArrays.SparseMatrixCSC{Bool, UInt64} with 3 stored entries:\n ⋅  ⋅  ⋅  ⋅  ⋅\n ⋅  ⋅  1  ⋅  ⋅\n ⋅  1  ⋅  ⋅  ⋅\n ⋅  ⋅  ⋅  1  ⋅\n ⋅  ⋅  ⋅  ⋅  ⋅\n\njulia> g(x) = f(x) + x[2]^x[5];\n\njulia> hessian_pattern(g, x)\n5×5 SparseArrays.SparseMatrixCSC{Bool, UInt64} with 7 stored entries:\n ⋅  ⋅  ⋅  ⋅  ⋅\n ⋅  1  1  ⋅  1\n ⋅  1  ⋅  ⋅  ⋅\n ⋅  ⋅  ⋅  1  ⋅\n ⋅  1  ⋅  ⋅  1\n\n\n\n\n\n","category":"function"},{"location":"api/","page":"API Reference","title":"API Reference","text":"TracerSparsityDetector","category":"page"},{"location":"api/#SparseConnectivityTracer.TracerSparsityDetector","page":"API Reference","title":"SparseConnectivityTracer.TracerSparsityDetector","text":"TracerSparsityDetector <: ADTypes.AbstractSparsityDetector\n\nSingleton struct for integration with the sparsity detection framework of ADTypes.jl.\n\nExample\n\njulia> using ADTypes, SparseConnectivityTracer\n\njulia> ADTypes.jacobian_sparsity(diff, rand(4), TracerSparsityDetector())\n3×4 SparseArrays.SparseMatrixCSC{Bool, UInt64} with 6 stored entries:\n 1  1  ⋅  ⋅\n ⋅  1  1  ⋅\n ⋅  ⋅  1  1\n\njulia> using ADTypes, SparseConnectivityTracer\n\njulia> f(x) = x[1] + x[2]*x[3] + 1/x[4];\n\njulia> ADTypes.hessian_sparsity(f, rand(4), TracerSparsityDetector())\n4×4 SparseArrays.SparseMatrixCSC{Bool, UInt64} with 3 stored entries:\n ⋅  ⋅  ⋅  ⋅\n ⋅  ⋅  1  ⋅\n ⋅  1  ⋅  ⋅\n ⋅  ⋅  ⋅  1\n\n\n\n\n\n","category":"type"},{"location":"api/#Internals","page":"API Reference","title":"Internals","text":"","category":"section"},{"location":"api/","page":"API Reference","title":"API Reference","text":"SparseConnectivityTracer works by pushing Number types called tracers through generic functions. Currently, three tracer types are provided:","category":"page"},{"location":"api/","page":"API Reference","title":"API Reference","text":"ConnectivityTracer\nJacobianTracer\nHessianTracer","category":"page"},{"location":"api/#SparseConnectivityTracer.ConnectivityTracer","page":"API Reference","title":"SparseConnectivityTracer.ConnectivityTracer","text":"ConnectivityTracer{S}(indexset) <: Number\n\nNumber type keeping track of input indices of previous computations.\n\nThe provided index set type S has to satisfy the following conditions:\n\nit is an iterable with <:Integer element type\nit implements methods union, union! and push!\n\nSubtypes of AbstractSet{<:Integer} are a natural choice, like BitSet or Set{UInt64}.\n\nFor a higher-level interface, refer to connectivity_pattern.\n\n\n\n\n\n","category":"type"},{"location":"api/#SparseConnectivityTracer.JacobianTracer","page":"API Reference","title":"SparseConnectivityTracer.JacobianTracer","text":"JacobianTracer{S}(indexset) <: Number\n\nNumber type keeping track of input indices of previous computations with non-zero derivatives.\n\nThe provided index set type S has to satisfy the following conditions:\n\nit is an iterable with <:Integer element type\nit implements methods union, union! and push!\n\nSubtypes of AbstractSet{<:Integer} are a natural choice, like BitSet or Set{UInt64}.\n\nFor a higher-level interface, refer to jacobian_pattern.\n\n\n\n\n\n","category":"type"},{"location":"api/#SparseConnectivityTracer.HessianTracer","page":"API Reference","title":"SparseConnectivityTracer.HessianTracer","text":"HessianTracer{S}(indexset) <: Number\n\nNumber type keeping track of input indices of previous computations with non-zero first and second derivatives.\n\nThe provided index set type S has to satisfy the following conditions:\n\nit is an iterable with <:Integer element type\nit implements methods union, union! and push!\n\nSubtypes of AbstractSet{<:Integer} are a natural choice, like BitSet or Set{UInt64}.\n\nFor a higher-level interface, refer to hessian_pattern.\n\n\n\n\n\n","category":"type"},{"location":"#SparseConnectivityTracer.jl","page":"Home","title":"SparseConnectivityTracer.jl","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"(Image: Stable) (Image: Dev) (Image: Build Status) (Image: Coverage) (Image: Aqua)","category":"page"},{"location":"","page":"Home","title":"Home","text":"Fast Jacobian and Hessian sparsity detection via operator-overloading.","category":"page"},{"location":"","page":"Home","title":"Home","text":"[!WARNING] This package is in early development. Expect frequent breaking changes and refer to the stable documentation.","category":"page"},{"location":"#Installation","page":"Home","title":"Installation","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"To install this package, open the Julia REPL and run ","category":"page"},{"location":"","page":"Home","title":"Home","text":"julia> ]add SparseConnectivityTracer","category":"page"},{"location":"#Examples","page":"Home","title":"Examples","text":"","category":"section"},{"location":"#Jacobian","page":"Home","title":"Jacobian","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"For functions y = f(x) and f!(y, x), the sparsity pattern of the Jacobian of f can be obtained by computing a single forward-pass through f:","category":"page"},{"location":"","page":"Home","title":"Home","text":"julia> using SparseConnectivityTracer\n\njulia> x = rand(3);\n\njulia> f(x) = [x[1]^2, 2 * x[1] * x[2]^2, sin(x[3])];\n\njulia> jacobian_pattern(f, x)\n3×3 SparseArrays.SparseMatrixCSC{Bool, UInt64} with 4 stored entries:\n 1  ⋅  ⋅\n 1  1  ⋅\n ⋅  ⋅  1","category":"page"},{"location":"","page":"Home","title":"Home","text":"As a larger example, let's compute the sparsity pattern from a convolutional layer from Flux.jl:","category":"page"},{"location":"","page":"Home","title":"Home","text":"julia> using SparseConnectivityTracer, Flux\n\njulia> x = rand(28, 28, 3, 1);\n\njulia> layer = Conv((3, 3), 3 => 2);\n\njulia> jacobian_pattern(layer, x)\n1352×2352 SparseArrays.SparseMatrixCSC{Bool, UInt64} with 36504 stored entries:\n⎡⠙⢿⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠻⣷⣤⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⣷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⎤\n⎢⠀⠀⠙⢿⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⢿⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⣷⣤⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⎥\n⎢⠀⠀⠀⠀⠙⢿⣦⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢿⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⢿⣦⡀⠀⠀⠀⠀⠀⠀⠀⎥\n⎢⠀⠀⠀⠀⠀⠀⠙⠻⣷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢿⣦⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢿⣦⡀⠀⠀⠀⠀⠀⎥\n⎢⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⣷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠻⣷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢿⣦⣀⠀⠀⠀⎥\n⎢⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⣷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⣷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠻⣷⣄⠀⎥\n⎢⢤⣤⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠛⠛⢦⣤⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠛⠳⣤⣤⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠛⠓⎥\n⎢⠀⠙⢿⣦⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢿⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢿⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⎥\n⎢⠀⠀⠀⠉⠻⣷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢿⣦⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢿⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⎥\n⎢⠀⠀⠀⠀⠀⠈⠻⣷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠻⣷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢿⣦⣄⠀⠀⠀⠀⠀⠀⎥\n⎢⠀⠀⠀⠀⠀⠀⠀⠈⠻⣷⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⣷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠻⣷⣄⠀⠀⠀⠀⎥\n⎢⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠛⢿⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⣷⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⣷⣄⠀⠀⎥\n⎣⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢿⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠛⢿⣦⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⣷⣄⎦","category":"page"},{"location":"","page":"Home","title":"Home","text":"The type of index set S that is internally used to keep track of connectivity can be specified via jacobian_pattern(f, x, S), defaulting to BitSet.  For high-dimensional functions, Set{UInt64} can be more efficient .","category":"page"},{"location":"#Hessian","page":"Home","title":"Hessian","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"For scalar functions y = f(x), the sparsity pattern of the Hessian of f can be obtained by computing a single forward-pass through f:","category":"page"},{"location":"","page":"Home","title":"Home","text":"julia> x = rand(5);\n\njulia> f(x) = x[1] + x[2]*x[3] + 1/x[4] + 1*x[5];\n\njulia> hessian_pattern(f, x)\n5×5 SparseArrays.SparseMatrixCSC{Bool, UInt64} with 3 stored entries:\n ⋅  ⋅  ⋅  ⋅  ⋅\n ⋅  ⋅  1  ⋅  ⋅\n ⋅  1  ⋅  ⋅  ⋅\n ⋅  ⋅  ⋅  1  ⋅\n ⋅  ⋅  ⋅  ⋅  ⋅\n\njulia> g(x) = f(x) + x[2]^x[5];\n\njulia> hessian_pattern(g, x)\n5×5 SparseArrays.SparseMatrixCSC{Bool, UInt64} with 7 stored entries:\n ⋅  ⋅  ⋅  ⋅  ⋅\n ⋅  1  1  ⋅  1\n ⋅  1  ⋅  ⋅  ⋅\n ⋅  ⋅  ⋅  1  ⋅\n ⋅  1  ⋅  ⋅  1","category":"page"},{"location":"","page":"Home","title":"Home","text":"For more detailled examples, take a look at the documentation.","category":"page"},{"location":"#Related-packages","page":"Home","title":"Related packages","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"SparseDiffTools.jl: automatic sparsity detection via Symbolics.jl and Cassette.jl\nSparsityTracing.jl: automatic Jacobian sparsity detection using an algorithm based on SparsLinC by Bischof et al. (1996)","category":"page"}]
}
