// URL: https://beta.observablehq.com/@epichef/deterministic-sir-model
// Title: Untitled
// Author: epichef (@epichef)
// Version: 126
// Runtime version: 1

const m0 = {
  id: "72dc62d45ebb4449@126",
  variables: [
    {
      inputs: ["sir_sol","width","DOM","Plotly"],
      value: (function(sir_sol,width,DOM,Plotly)
{
  var t = sir_sol.t
  var S = sir_sol.y.map((x)=>{return x[0]})
  var I = sir_sol.y.map((x)=>{return x[1]})
  var R = sir_sol.y.map((x)=>{return x[2]})
  var strace = {
    type: "scatter",
    mode: "step",
    name: 'S',
    x: t,
    y: S,
    line: {color: 'blue'}
  }
  var itrace = {
    type: "scatter",
    mode: "step",
    name: 'I',
    x: t,
    y: I,
    line: {color: 'red'}
  }
  var rtrace = {
    type: "scatter",
    mode: "step",
    name: 'R',
    x: t,
    y: R,
    line: {color: 'green'}
  }
  
  var data = [strace,itrace,rtrace];
  
  var layout = {
    width: width
  };
  
  const div = DOM.element('div');
  Plotly.newPlot(div, data, layout);
  return div;
}
)
    },
    {
      name: "viewof b",
      inputs: ["slider"],
      value: (function(slider){return(
slider({
  value : 0.1,
  min: 0,
  max: 0.2,
  precision: 2,
  description: "Infectivity parameter"
})
)})
    },
    {
      name: "b",
      inputs: ["Generators","viewof b"],
      value: (G, _) => G.input(_)
    },
    {
      name: "viewof g",
      inputs: ["slider"],
      value: (function(slider){return(
slider({
  value: 0.05,
  min: 0,
  max: 0.1,
  precision: 2,
  description: "Recovery rate"
})
)})
    },
    {
      name: "g",
      inputs: ["Generators","viewof g"],
      value: (G, _) => G.input(_)
    },
    {
      name: "viewof I0",
      inputs: ["slider"],
      value: (function(slider){return(
slider({
  value: 0.01,
  min: 0,
  max: 0.2,
  precision: 2,
  description: "Initial proportion infected"
})
)})
    },
    {
      name: "I0",
      inputs: ["Generators","viewof I0"],
      value: (G, _) => G.input(_)
    },
    {
      name: "viewof tmax",
      inputs: ["slider"],
      value: (function(slider){return(
slider({
  value: 200,
  min: 100,
  max: 1000,
  precision: 1,
  description: "Simulation time"
})
)})
    },
    {
      name: "tmax",
      inputs: ["Generators","viewof tmax"],
      value: (G, _) => G.input(_)
    },
    {
      name: "viewof step",
      inputs: ["slider"],
      value: (function(slider){return(
slider({
  value: 0.1,
  min: 0.01,
  max: 0.5,
  precision: 2,
  description: "Step size"
})
)})
    },
    {
      name: "step",
      inputs: ["Generators","viewof step"],
      value: (G, _) => G.input(_)
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`## Model code`
)})
    },
    {
      name: "sir",
      inputs: ["b","g"],
      value: (function(b,g){return(
function sir(dydt, y, t) {
  dydt[0] = -b*y[0]*y[1];
  dydt[1] = b*y[0]*y[1] - g*y[1];
  dydt[2] = g*y[1];
}
)})
    },
    {
      name: "sir_sol",
      inputs: ["simulate","sir","I0","step","tmax"],
      value: (function(simulate,sir,I0,step,tmax){return(
simulate(sir,0,[1.0-I0,I0,0.0],step,tmax)
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`## Utility functions`
)})
    },
    {
      name: "copy",
      value: (function(){return(
function copy(x) {
  return Object.assign({},x)
}
)})
    },
    {
      name: "simulate",
      inputs: ["rk4","copy"],
      value: (function(rk4,copy){return(
function simulate(f,t0,y0,step,tmax) {
  var integrator = rk4(y0, f, t0, step)
  var t = t0
  var y = y0
  var ta = []
  var ya = []
  ta.push(t0)
  ya.push(copy(y))
  while(true){
    t = t+step
    if(t>tmax) break
    integrator=integrator.step()
    ya.push(copy(integrator.y))
    ta.push(t)
  }
  return {t:ta,y:ya};
}
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`## Dependencies`
)})
    },
    {
      name: "rk4",
      inputs: ["require"],
      value: (function(require){return(
require('https://bundle.run/ode-rk4')
)})
    },
    {
      from: "@jashkenas/inputs",
      name: "slider",
      remote: "slider"
    },
    {
      name: "Plotly",
      inputs: ["require"],
      value: (function(require){return(
require("https://cdn.plot.ly/plotly-latest.min.js")
)})
    }
  ]
};

const m1 = {
  id: "@jashkenas/inputs",
  variables: [
    {
      name: "slider",
      inputs: ["input"],
      value: (function(input){return(
function slider(config = {}) {
  let {value, min = 0, max = 1, step = "any", precision = 2, title, description, format, submit} = config;
  if (typeof config == "number") value = config;
  if (value == null) value = (max + min) / 2;
  precision = Math.pow(10, precision);
  return input({
    type: "range", title, description, submit, format,
    attributes: {min, max, step, value},
    getValue: input => Math.round(input.valueAsNumber * precision) / precision
  });
}
)})
    },
    {
      name: "input",
      inputs: ["html","d3format"],
      value: (function(html,d3format){return(
function input(config) {
  let {form, type = "text", attributes = {}, action, getValue, title, description, format, submit, options} = config;
  if (!form) form = html`<form>
	<input name=input type=${type} />
  </form>`;
  const input = form.input;
  Object.keys(attributes).forEach(key => {
    const val = attributes[key];
    if (val != null) input.setAttribute(key, val);
  });
  if (submit) form.append(html`<input name=submit type=submit style="margin: 0 0.75em" value="${typeof submit == 'string' ? submit : 'Submit'}" />`);
  form.append(html`<output name=output style="font: 14px Menlo, Consolas, monospace; margin-left: 0.5em;"></output>`);
  if (title) form.prepend(html`<div style="font: 700 0.9rem sans-serif;">${title}</div>`);
  if (description) form.append(html`<div style="font-size: 0.85rem; font-style: italic;">${description}</div>`);
  if (format) format = d3format.format(format);
  if (action) {
    action(form);
  } else {
    const verb = submit ? "onsubmit" : type == "button" ? "onclick" : type == "checkbox" || type == "radio" ? "onchange" : "oninput";
    form[verb] = (e) => {
      e && e.preventDefault();
      const value = getValue ? getValue(input) : input.value;
      if (form.output) form.output.value = format ? format(value) : value;
      form.value = value;
      if (verb !== "oninput") form.dispatchEvent(new CustomEvent("input"));
    };
    if (verb !== "oninput") input.oninput = e => e && e.stopPropagation() && e.preventDefault();
    if (verb !== "onsubmit") form.onsubmit = (e) => e && e.preventDefault();
    form[verb]();
  }
  return form;
}
)})
    },
    {
      name: "d3format",
      inputs: ["require"],
      value: (function(require){return(
require("d3-format")
)})
    }
  ]
};

const notebook = {
  id: "72dc62d45ebb4449@126",
  modules: [m0,m1]
};

export default notebook;
