---
interact_link: notebooks/sir/python.ipynb
title: 'Python using SciPy'
permalink: 'chapters/sir/python'
previouschapter:
  url: chapters/sir/intro
  title: 'SIR model'
nextchapter:
  url: chapters/sir/r_desolve
  title: 'R using deSolve'
redirect_from:
  - 'chapters/sir/python'
---

### Python using scipy

*Author*: Simon Frost

*Date*: 2018-07-12


{:.input_area}
```python
import numpy as np
import pandas as pd
from scipy.integrate import ode, solve_ivp
```


{:.input_area}
```python
def sir_ode(times,init,parms):
    b, g = parms
    S,I,R = init
    # ODEs
    dS = -b*S*I
    dI = b*S*I-g*I
    dR = g*I
    return [dS,dI,dR]
```


{:.input_area}
```python
parms = [0.1,0.05]
init = [0.99,0.01,0]
times = np.linspace(0,200,2001)
```


{:.input_area}
```python
sir_sol = solve_ivp(fun=lambda t, y: sir_ode(t, y, parms), t_span=[min(times),max(times)], y0=init, t_eval=times)
```


{:.input_area}
```python
sir_out = pd.DataFrame({"t":sir_sol["t"],"S":sir_sol["y"][0],"I":sir_sol["y"][1],"R":sir_sol["y"][2]})
```

#### Visualisation


{:.input_area}
```python
import matplotlib.pyplot as plt
```


{:.input_area}
```python
plt.style.use("ggplot")
```


{:.input_area}
```python
sline = plt.plot("t","S","",data=sir_out,color="red",linewidth=2)
iline = plt.plot("t","I","",data=sir_out,color="green",linewidth=2)
rline = plt.plot("t","R","",data=sir_out,color="blue",linewidth=2)
plt.xlabel("Time",fontweight="bold")
plt.ylabel("Number",fontweight="bold")
legend = plt.legend(title="Population",loc=5,bbox_to_anchor=(1.25,0.5))
frame = legend.get_frame()
frame.set_facecolor("white")
frame.set_linewidth(0)
```


![png](../../images/chapters/sir/python_10_0.png)

