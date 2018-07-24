---
interact_link: notebooks/sir-stochastic-discretestate-continuoustime/r.ipynb
title: 'R'
permalink: 'chapters/sir-stochastic-discretestate-continuoustime/r'
previouschapter:
  url: chapters/sir-stochastic-discretestate-continuoustime/intro
  title: 'Continuous time'
nextchapter:
  url: chapters/sir-stochastic-discretestate-continuoustime/r-gillespiessa
  title: 'R using GillespieSSA'
redirect_from:
  - 'chapters/sir-stochastic-discretestate-continuoustime/r'
---

### Stochastic SIR model (discrete state, continuous time) in R


{:.input_area}
```R
library(reshape2)
```


{:.input_area}
```R
sir <- function(beta, gamma, N, S0, I0, R0, tf) {
    time <- 0
    S <- S0
    I <- I0
    R <- R0
    ta <- numeric(0)
    Sa <- numeric(0)
    Ia <- numeric(0)
    Ra <- numeric(0)
    while (time < tf) {
        ta <- c(ta, time)
        Sa <- c(Sa, S)
        Ia <- c(Ia, I)
        Ra <- c(Ra, R)
        pf1 <- beta * S * I
        pf2 <- gamma * I
        pf <- pf1 + pf2
        dt <- rexp(1, rate = pf)
        time <- time + dt
        if (time > tf) {
            break
        }
        ru <- runif(1)
        if (ru < (pf1/pf)) {
            S <- S - 1
            I <- I + 1
        } else {
            I <- I - 1
            R <- R + 1
        }
        if (I == 0) {
            break
        }
    }
    results <- data.frame(time = ta, S = Sa, I = Ia, R = Ra)
    return(results)
}
```


{:.input_area}
```R
set.seed(42)
```


{:.input_area}
```R
sir_out <- sir(0.1/1000,0.05,1000,999,1,0,200)
```


{:.input_area}
```R
if(dim(sir_out)[1]==1){
    sir_out <- sir(0.1/1000,0.05,1000,999,1,0,200)
}
```


{:.input_area}
```R
head(sir_out)
```


<div markdown="0">
<table>
<thead><tr><th scope=col>time</th><th scope=col>S</th><th scope=col>I</th><th scope=col>R</th></tr></thead>
<tbody>
	<tr><td> 0.000000</td><td>999      </td><td>1        </td><td>0        </td></tr>
	<tr><td> 1.891201</td><td>998      </td><td>2        </td><td>0        </td></tr>
	<tr><td> 3.470562</td><td>997      </td><td>3        </td><td>0        </td></tr>
	<tr><td> 4.169704</td><td>997      </td><td>2        </td><td>1        </td></tr>
	<tr><td> 8.149657</td><td>996      </td><td>3        </td><td>1        </td></tr>
	<tr><td>11.145904</td><td>995      </td><td>4        </td><td>1        </td></tr>
</tbody>
</table>

</div>



{:.input_area}
```R
sir_out_long <- melt(sir_out,"time")
```

#### Visualisation


{:.input_area}
```R
library(ggplot2)
```


{:.input_area}
```R
ggplot(sir_out_long,aes(x=time,y=value,colour=variable,group=variable))+
  # Add line
  geom_line(lwd=2)+
  #Add labels
  xlab("Time")+ylab("Number")
```




![png](../../images/chapters/sir-stochastic-discretestate-continuoustime/r_10_1.png)

