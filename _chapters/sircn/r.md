---
interact_link: notebooks/sircn/r.ipynb
title: 'R'
permalink: 'chapters/sircn/r'
previouschapter:
  url: chapters/sircn/intro
  title: 'An edge based SIR model on a configuration network'
nextchapter:
  url: chapters/applications
  title: 'Applications'
redirect_from:
  - 'chapters/sircn/r'
---

## SIR model on a configuration network in R using simecol

*Author*: Simon Frost

*Date*: 2018-07-12

### Description

### Equations

$$
$$

### References

### Implementation


{:.input_area}
```R
library(simecol)
library(reshape2)
```


{:.input_area}
```R
sir.cn.ode <- new("odeModel",
  main = function(time, init, parms, ...){
    with(as.list(c(init,parms)),{
      dtheta <- -beta*theta+beta*(dpsi(theta,k)/dpsi(1,k))+gamma*(1-theta)
      S <- psi(theta,k)
      I <- 1-S-R
      dR <- gamma*I
      list(c(dtheta,dR))
    })},
  equations = list(),
  parms = c(beta=0.1,gamma=0.05,k=5),
  times = c(from=0,to=125,by=0.01),
  init = c(theta=0.999,R=0),
  solver = "lsoda"
)
poisgn <- list(
  psi = function(theta,k){theta^k},
  dpsi = function(theta,k){k*theta^(k-1)},
  dpsi2 = function(theta,k){k*(k-1)*theta^(k-2)}
)
equations(sir.cn.ode) <- poisgn
sir.cn.ode <- sim(sir.cn.ode)
sir.cn.out <- out(sir.cn.ode)
sir.cn.out$S <- sir.cn.out$theta^parms(sir.cn.ode)[["k"]]
sir.cn.out$I <- 1-sir.cn.out$S-sir.cn.out$R
```


{:.input_area}
```R
sir.cn.out.long <- melt(as.data.frame(sir.cn.out),"time")
```

## Visualisation


{:.input_area}
```R
library(ggplot2)
```


{:.input_area}
```R
ggplot(sir.cn.out.long,aes(x=time,y=value,colour=variable,group=variable))+
  # Add line
  geom_line(lwd=2)+
  #Add labels
  xlab("Time")+ylab("Number")
```




![png](../../images/chapters/sircn/r_12_1.png)

