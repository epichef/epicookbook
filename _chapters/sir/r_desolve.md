---
interact_link: notebooks/sir/r_desolve.ipynb
title: 'R using deSolve'
permalink: 'chapters/sir/r_desolve'
previouschapter:
  url: chapters/sir/python
  title: 'Python using SciPy'
nextchapter:
  url: chapters/sir/r_odin
  title: 'R using odin'
redirect_from:
  - 'chapters/sir/r-desolve'
---

### R using deSolve

*Author*: Simon Frost

*Date*: 2018-07-12


{:.input_area}
```R
library(deSolve)
library(reshape2)
```


{:.input_area}
```R
sir.ode <- function(times,init,parms){
  with(as.list(c(parms,init)), {
  # ODEs
  dS <- -beta*S*I
  dI <- beta*S*I-gamma*I
  dR <- gamma*I
  list(c(dS,dI,dR))
  })
}
parms <- c(beta=0.1,gamma=0.05)
init <- c(S=0.99,I=0.01,R=0) 
times <- seq(0,200,length.out=2001)
sir.out <- lsoda(init,times,sir.ode,parms)
```


{:.input_area}
```R
sir.out.long <- melt(as.data.frame(sir.out),"time")
```

#### Visualisation


{:.input_area}
```R
library(ggplot2)
```


{:.input_area}
```R
ggplot(sir.out.long,aes(x=time,y=value,colour=variable,group=variable))+
  # Add line
  geom_line(lwd=2)+
  #Add labels
  xlab("Time")+ylab("Number")
```




![png](../../images/chapters/sir/r_desolve_7_1.png)

