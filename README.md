# ⚡ thunder.js
Just a tiny but useful and easy-use library that allows you to add great animated lightning to your canvases!
## Only developer version is available for now!!!
Check how it works following this [demo link](https://ttonightt.github.io/)
Some features from docs may not work in appropriate way!!!
<br>_New versions come at least one times a week. Wait the final release! ;)_
## :scroll: Tutorial
#### 1.1. At first connect thunder.js or thunder.min.js from .zip, that you've [downloaded](https://github.com/ttonightt/thunder.js/archive/refs/heads/master.zip) already:
```
<script type="text/javascript" src="thunder.js"></script>
```
<sub>_* Just put code above into ```<head>```_
#### 1.2. Also don't forget to create ```<canvas>``` anywhere and link it in your source. The simplest way to do it is below:
```
<!-- somewhere in the <body></body> -->
<canvas id="-canvas-id-"></canvas>
<script type="text/javascript" src="path-to-your-source.js"></script>
```
```
// your-source.js
const ctx = document.getElementById("-canvas-id").getContext("2d");
```
<sub>_* If you gonna develop smth either **mobile- or Apple-** friendly set appropriate canvas size considering [window.devicePixelRatio](https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio).<br>(Just multiple objective width and height of canvas on it and compress them back by means of CSS). **That's enough.** Thunder.js is drawing lightnings using "devicePixelRatio" directly_</sub>
<br><br>
#### 2.1. Okay, you've done it, you're ready to draw first lightning. You need to connect your ctxs to thunder.js, so:
```
ThunderJSProperties.setContexts(ctx /*main canvas*/, ctxb /*additional one to make lightning glowing*/);
```
<sub>_* Yeah, I know that using additional canvas for blur is such a stupid way, but both Safari for IOS and desktop just don't support ```ctx.filter```. Some libs that are kinda fix it either too slow or just doesn't work! :/<br>So, if you know any workable tool to fix it text me please. Or just text to Tim Cook idk. Thanks!)_</sub>
#### 2.2. To create a new lightning use instance of ```Lightning``` class:
```
let myLightning = new Lightning (x0, y0, x, y);
```
- x0, y0 are recognized as a start of lightning. Consider this, if you going to ["expand"](#expand()) by means of ```.expand()``` method
- x, y are recognized as an end of lightning<br>
_**Besides** basic four arguments you can add specific "properties" arg' that can contains color, animation algorythm and some other parameters, which you might store in [ThunderJSProperties](https://github.com/ttonightt/thunder.js#ThunderJSProperties-(object)) early._ [Learn more](https://github.com/ttonightt/thunder.js#Lightning-(class))
#### 2.3. Animate or draw it!
```
// in case you want to animate it:
myLightning.startAnimation();
// in case you want to draw:
myLightning.draw();
```
To **stop** animation:
```
myLightning.stopAnimation();
```
## :trident: Other Docs
### ```Lightning``` _(class)_
Main class of thunder.js
- ```constructor (x0: number, y0: number, x: number, y: number, properties: {/*...*/})```<br><br>
  > ***properties*** : {...} is in fact an instance of ThunderJSProperties and can contains any parameter from there. As far as you understand it exists to configure specificly the lightning instead of using ThunderJSProperties parameters.
- ```.expand (ex: number, ey: number):void``` "expands" the lightning to fit from the **start** to getted ex and ey. **Start stay fixed.**
- ```.startAnimation (ctx, ctxb):void``` Basicly starts animation of the lightning<br><br>
  > ***ctx*** : [CanvasRenderingContext2D](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D). Gets ThunderJSProperties.ctx if unset<br>
  > ***ctxb*** : [CanvasRenderingContext2D](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D). Gets ThunderJSProperties.ctx if unset
- ```.stopAnimation ():void``` Stops the animation
- ```.draw (ctx, ctxb):void``` Draws the lightning<br><br>
  > ***ctx*** : [CanvasRenderingContext2D](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D). Gets ThunderJSProperties.ctx if unset<br>
  > ***ctxb*** : [CanvasRenderingContext2D](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D). Gets ThunderJSProperties.ctx if unset
### ```ThunderJSProperties``` _(object)_
Set of global lightning parameters from a common look to some service parameters
```
/* ThunderJSProperties structure: */
ThunderJSProperties = {
    ctx: /*CanvasRenderingContext2D*/, // null by default
    ctxb: /*CanvasRenderingContext2D*/, // null by default
    look: {
        color: /*hexcode, rgb or rgba*/,
        blurColor: /*hexcode, rgb or rgba*/,
        colorFading: /*[0 to 1, 0 to 1] or just 0 to 1*/, // 1 by default
        lineFading: /*[]*/, // [0.7, 2] by default
    },
    algorythm: /* "teslacoil", "fast", "oneshot" */, /* "teslacoil" (default) is the slowest and literally look like lightning from Tesla coil,
                  "fast" is the fastest but looks less naturally,
                  "oneshot" is the best algo' to "blink" the lightning */
    fps: /*number*/,
    ignoreIterator: /*boolean*/, // if true and fps <= 0 lightning will animate as fast as possible. If false and fps <= 0 lightning will redraw not every iteratorTreshold'th frame
    iteratorTreshold: /*number*/, // read commet above
}
```
