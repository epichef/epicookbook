---
interact_link: notebooks/sir-stochastic-discretestate-continuoustime/julia.ipynb
title: 'Julia'
permalink: 'chapters/sir-stochastic-discretestate-continuoustime/julia'
previouschapter:
  url: chapters/sir-stochastic-discretestate-continuoustime/r-rcpp
  title: 'R using Rcpp'
nextchapter:
  url: chapters/sir-stochastic-discretestate-discretetime/intro
  title: 'Discrete time'
redirect_from:
  - 'chapters/sir-stochastic-discretestate-continuoustime/julia'
---

### Stochastic SIR model (discrete state, continuous time) in Julia


{:.input_area}
```julia
using DataFrames
using Distributions
```


{:.input_area}
```julia
function sir(beta,gamma,N,S0,I0,R0,tf)
    t = 0
    S = S0
    I = I0
    R = R0
    ta=DataArray(Float64,0)
    Sa=DataArray(Float64,0)
    Ia=DataArray(Float64,0)
    Ra=DataArray(Float64,0)
    while t < tf
        push!(ta,t)
        push!(Sa,S)
        push!(Ia,I)
        push!(Ra,R)
        pf1 = beta*S*I
        pf2 = gamma*I
        pf = pf1+pf2
        dt = rand(Exponential(1/pf))
        t = t+dt
        if t>tf
            break
        end
        ru = rand()
        if ru<(pf1/pf)
            S=S-1
            I=I+1
        else
            I=I-1
            R=R+1
        end
    end
    results = DataFrame()
    results[:time] = ta
    results[:S] = Sa
    results[:I] = Ia
    results[:R] = Ra
    return(results)
end
```




{:.output_data_text}
```
sir (generic function with 1 method)
```




{:.input_area}
```julia
srand(42)
```




{:.output_data_text}
```
MersenneTwister(UInt32[0x0000002a], Base.dSFMT.DSFMT_state(Int32[964434469, 1073036706, 1860149520, 1073503458, 1687169063, 1073083486, -399267803, 1072983952, -909620556, 1072836235  …  -293054293, 1073002412, -1300127419, 1073642642, 1917177374, -666058738, -337596527, 1830741494, 382, 0]), [1.64879, 1.78639, 1.07348, 1.36027, 1.42523, 1.97645, 1.45162, 1.16015, 1.778, 1.6261  …  1.7593, 1.84751, 1.43425, 1.79251, 1.24761, 1.59121, 1.57693, 1.60592, 1.77807, 1.54728], 382)
```




{:.input_area}
```julia
sir_out = sir(0.1/1000,0.05,1000,999,1,0,200);
```


{:.input_area}
```julia
head(sir_out)
```




<div markdown="0">
<table class="data-frame"><thead><tr><th></th><th>time</th><th>S</th><th>I</th><th>R</th></tr></thead><tbody><tr><th>1</th><td>0.0</td><td>999.0</td><td>1.0</td><td>0.0</td></tr><tr><th>2</th><td>5.379752069687035</td><td>998.0</td><td>2.0</td><td>0.0</td></tr><tr><th>3</th><td>5.893184678545169</td><td>997.0</td><td>3.0</td><td>0.0</td></tr><tr><th>4</th><td>8.471821754633556</td><td>997.0</td><td>2.0</td><td>1.0</td></tr><tr><th>5</th><td>8.611176501322</td><td>996.0</td><td>3.0</td><td>1.0</td></tr><tr><th>6</th><td>16.767837900838497</td><td>995.0</td><td>4.0</td><td>1.0</td></tr></tbody></table>
</div>



#### Visualisation


{:.input_area}
```julia
using StatPlots
```


{:.input_area}
```julia
@df sir_out plot(:time, [:S :I :R], xlabel="Time",ylabel="Number")
```




![svg](../../images/chapters/sir-stochastic-discretestate-continuoustime/julia_8_0.svg)


