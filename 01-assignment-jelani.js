/// <reference path="libs/three.min.js" />
//name: Jelani Garnes
//date: Febuary 05, 2019
//file: Assignment1.js



const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100000000000);
const renderer = new THREE.WebGLRenderer();
const clock = new THREE.Clock();
const axesHelper = new THREE.AxesHelper(10);


let controls,
    trackballControls,
    buldLight,
    hemiLight,
    sun,
    earth,
    earthMoonSpeed=0.001,
    marsMoonSpeed=0.001,
    jupiterMoonSpeed=0.01,
    saturnMoonSpeed=0.01,
    uranusMoonSpeed=0.01,
    neptuneMoonSpeed=0.01,
    mercurySpeed=87.97,
    venusSpeed=0.002247,
    earthSpeed=0.00036526,
    marsSpeed=0.00068698,
    jupiterSpeed=0.000433282,
    saturnSpeed=0.00001075570,
    uranusSpeed=0.0003068715,
    neptuneSpeed=0.00006019003,
    plutoSpeed=0.00000090500,
    mercuryOrbit = new THREE.Object3D(),
    venusOrbit = new THREE.Object3D(),
    earthOrbit = new THREE.Object3D(),
    marsOrbit = new THREE.Object3D(),
    jupiterOrbit = new THREE.Object3D(),
    saturnOrbit = new THREE.Object3D(),
    uranusOrbit = new THREE.Object3D(),
    neptuneOrbit = new THREE.Object3D(),
    plutoOrbit = new THREE.Object3D(),
    earthMoonOrbit = new THREE.Object3D(),
    marsMoonOrbit1 = new THREE.Object3D(),
    marsMoonOrbit2 = new THREE.Object3D(),
    jupiterMoonsOrbits = new THREE.Group(),
    saturnMoonsOrbits = new THREE.Group(),
    uranusMoonsOrbit = new THREE.Group(),
    neptuneMoonsOrbit = new THREE.Group(),
    angel='y',
    light;

//function definitions
function init() {
    //the renderer
    renderer.setClearColor(0x000000);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    //setup the dat-gui widget
    control = new function () {
        this.MercurySpeed=87.97;
        this.VenusSpeed=0.002247;
        this.EarthSpeed=0.00036526;
        this.MarsSpeed=0.00068698;
        this.JupiterSpeed=0.000433282;
        this.SaturnSpeed=0.0001075570;
        this.UranusSpeed=0.0003068715;
        this.NeptuneSpeed=0.00006019003;
        this.PlutoSpeed=0.00000090500;
        this.EarthMoonSpeed=0.01;
        this.MarsMoonSpeed=0.01;
        this.JupiterMoonSpeed=0.01;
        this.SaturnMoonSpeed=0.01;
        this.UranusMoonSpeed=0.01;
        this.NeptuneMoonSpeed=0.01;
        this.TurnOnAmbientLight=false;
    }
    gui = new dat.GUI();
    let planets = gui.addFolder('Planets');
    let earthMoon = gui.addFolder('EarthMoon');
    let marsMoon = gui.addFolder('MarsMoons');
    let jupiterMoon = gui.addFolder('JupiterMoons');
    let saturnMoon = gui.addFolder('SaturnMoons');
    let uranusMoon = gui.addFolder('UranusMoons');
    let neptuneMoon = gui.addFolder('NeptuneMoons')
    planets.add(control,"MercurySpeed",0.00,100.00,87.97).onChange((value)=>{
        mercurySpeed=parseFloat(value);
    });
    planets.add(control,"VenusSpeed",0.00,0.005,0.002247).onChange((value)=>{
        venusSpeed=value;
    });
    planets.add(control,"EarthSpeed",0.00,0.005,0.00036526).onChange((value)=>{
        earthSpeed=value;
    });
    planets.add(control,"MarsSpeed",0.00,0.005,0.000068698).onChange((value)=>{
        marsSpeed=value;
    });
    planets.add(control,"JupiterSpeed",0.00,0.005,0.00000433282).onChange((value)=>{
        jupiterSpeed=value;
    });
    planets.add(control,"SaturnSpeed",0.00,0.005,0.00000001075570).onChange((value)=>{
        saturnSpeed=value;
    });
    planets.add(control,"UranusSpeed",0.00,0.005,0.0000000003068715).onChange((value)=>{
        uranusSpeed=value;
    });
    planets.add(control,"NeptuneSpeed",0.00,0.005,0.000000000006019003).onChange((value)=>{
        neptuneSpeed=value;
    });
    planets.add(control,"PlutoSpeed",0.00,0.005,0.000000000000090500).onChange((value)=>{
        plutoSpeed=value;
    });
    earthMoon.add(control,"EarthMoonSpeed",0.00,0.1,0.001).onChange((value)=>{
        earthMoonSpeed=value;
    });
    marsMoon.add(control,"MarsMoonSpeed",0.00,0.1,0.001).onChange((value)=>{
        marsMoonSpeed=value;
    });
    jupiterMoon.add(control,"JupiterMoonSpeed",0.00,0.1,0.01).onChange((value)=>{
        jupiterMoonSpeed=value;
    });
    saturnMoon.add(control,"SaturnMoonSpeed",0.00,0.1,0.01).onChange((value)=>{
        saturnMoonSpeed=value;
    });
    uranusMoon.add(control,"UranusMoonSpeed",0.00,0.1,0.01).onChange((value)=>{
        uranusMoonSpeed=value;
    });
    neptuneMoon.add(control,"NeptuneMoonSpeed",0.00,0.1,0.01).onChange((value)=>{
        neptuneMoonSpeed=value;
    });
    gui.add(control,"TurnOnAmbientLight").onChange((value)=>{
            light.visible=value;
    });
    //controls = new THREE.OrbitControls(camera,renderer.domElement);
    trackballControls = new THREE.TrackballControls(camera, renderer.domElement);
}

function setupCamera() {
    camera.position.x = 0;
    camera.position.y = 1000000;
    camera.position.z = 2000;
    camera.lookAt(scene.position);

    light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
    scene.add( light );
}

function createSun() {
    sun = new THREE.PointLight(0xFFFFFF, 2, 0,2);
    let sunGeometry = new THREE.SphereGeometry(30000, 32, 50);
    let sunMaterial = new THREE.MeshLambertMaterial({ color: 0xFFCC33 });
    sun.add(new THREE.Mesh( sunGeometry, sunMaterial));
    scene.add(sun);
    sun.add(mercuryOrbit);
    sun.add(venusOrbit);
    sun.add(earthOrbit);
    sun.add(marsOrbit);
    sun.add(jupiterOrbit);
    sun.add(saturnOrbit);
    sun.add(uranusOrbit);
    sun.add(neptuneOrbit);
    sun.add(plutoOrbit);
}
//multiply by 10000
function createMercury(){
    let mercuryGeometry = new THREE.SphereGeometry(350,32,50);
    let mercuryMaterial = new THREE.MeshLambertMaterial({color: 0xA9A9A9});
    let mercury = new THREE.Mesh(mercuryGeometry,mercuryMaterial);
    createRing((sun.position.x + 57910));
    mercury.position.x=(sun.position.x + 57910);
    scene.add(mercury); 
    mercuryOrbit.add(mercury);
    mercuryOrbit.rotation.z=Math.floor((Math.random() * 10) + 1);
}
function createVenus(){
    let venusGeometry = new THREE.SphereGeometry(880,32,50);
    let venusMaterial = new THREE.MeshLambertMaterial({color: 0xa13d2d});
    let venus = new THREE.Mesh(venusGeometry,venusMaterial);

    createRing((sun.position.x + 108200));

    venus.position.x =(sun.position.x + 108200);
    scene.add(venus);
    venusOrbit.add(venus);
    venusOrbit.rotation.z=Math.floor((Math.random() * 10) + 1);
}
function createEarth(){
    let geometry = new THREE.SphereGeometry(920,32,50);
    let material = new THREE.MeshPhysicalMaterial({color: 0x008080},{flatShading: true});
    earth = new THREE.Mesh(geometry,material);

    earth.position.x=(sun.position.x + 149600);
    scene.add(earth);
    earthOrbit.add(earth);
    createMoons("Earth",earth,1,earthMoonOrbit);
    createRing((sun.position.x+149600));
    earthOrbit.rotation.z=Math.floor((Math.random() * 10) + 1);
}
function createMars(){
    let geometry = new THREE.SphereGeometry(500,32,50);
    let material = new THREE.MeshPhysicalMaterial({color: 0xb7410e},{flatShading: true});
    let mars = new THREE.Mesh(geometry,material);
    
    mars.position.x=(sun.position.x + 227900);
    scene.add(mars);
    marsOrbit.add(mars)
    createMoons("Mars",mars,2);
    createRing((sun.position.x+227900));
    marsOrbit.rotation.z=Math.floor((Math.random() * 10) + 1);
}
function createJupiter(){
    let geometry = new THREE.SphereGeometry(10360,32,50);
    let material = new THREE.MeshPhysicalMaterial({color: 0xA52A2A},{flatShading: true});
    let jupiter = new THREE.Mesh(geometry,material);
    
    jupiter.position.x=(sun.position.x + 300000);
    scene.add(jupiter);
    jupiterOrbit.add(jupiter);
    createMoons("Jupiter",jupiter,79,0);
    createRing((sun.position.x+300000));
    jupiterOrbit.rotation.z=Math.floor((Math.random() * 10) + 1);
}
function createSaturn(){
    let geometry = new THREE.SphereGeometry(8710,32,50);
    let material = new THREE.MeshPhysicalMaterial({color: 0xfde522},{flatShading: true});
    let saturn = new THREE.Mesh(geometry,material);
    
    saturn.position.x=(sun.position.x + 400000);
    scene.add(saturn);
    saturnOrbit.add(saturn);
    createMoons("Saturn",saturn,53,0);
    createRing((sun.position.x + 400000));
    saturnOrbit.rotation.z=Math.floor((Math.random() * 10) + 1);
}
function createUranus(){
    let geometry = new THREE.SphereGeometry(3710,32,50);
    let material = new THREE.MeshPhysicalMaterial({color: 0xd1e7e7},{flatShading: true});
    let uranus = new THREE.Mesh(geometry,material);
    
    uranus.position.x=(sun.position.x + 500000);
    scene.add(uranus);
    uranusOrbit.add(uranus);
    createMoons("Uranus",uranus,27,0);
    createRing((sun.position.x + 500000));
    uranusOrbit.rotation.z=Math.floor((Math.random() * 10) + 1);
}
function createNeptune(){
    let geometry = new THREE.SphereGeometry(3600,32,50);
    let material = new THREE.MeshPhysicalMaterial({color: 0x44667f},{flatShading: true});
    let neptune = new THREE.Mesh(geometry,material);
    
    neptune.position.x=(sun.position.x + 600000);
    scene.add(neptune);
    neptuneOrbit.add(neptune);
    createMoons("Neptune",neptune,13,0);
    createRing((sun.position.x + 600000));
    neptuneOrbit.rotation.z=Math.floor((Math.random() * 10) + 1);
}
function createPluto(){
    let geometry = new THREE.SphereGeometry(1600,32,50);
    let material = new THREE.MeshPhysicalMaterial({color: 0xF4A460},{flatShading: true});
    let pluto = new THREE.Mesh(geometry,material);
    pluto.position.x=(sun.position.x + 700000);
    scene.add(pluto);
    plutoOrbit.add(pluto);
    createRing((sun.position.x + 700000));
    plutoOrbit.rotation.z=Math.floor((Math.random() * 10) + 1);
}
function addaxesHelper() {

    scene.add(axesHelper);
}
function createMoons(name,planet,numberOfMoons,planetOrbit){
    for(i=0; i<numberOfMoons;i++){
        switch(name){
            case 'Mars':
            {
                let geometry = new THREE.SphereGeometry(150,32,50);
                let material = new THREE.MeshLambertMaterial({color: 0xDCDCDC});
                let moon = new THREE.Mesh(geometry,material);
                moon.position.x = 1500;
                switch(i)
                {
                    case 0:
                    planet.add(marsMoonOrbit1);
                    marsMoonOrbit1.add(moon);
                    break;
                    case 1:
                    marsMoonOrbit2.rotation.y -= 4;
                    marsMoonOrbit2.rotation.z -= 4;
                    planet.add(marsMoonOrbit2);
                    marsMoonOrbit2.add(moon);
                    break;
                }
                break;
            }
            case "Jupiter":
            {
                console.log("Creating moon: "+i+" for "+name);
                let geometry = new THREE.SphereGeometry((Math.random()*(1000-150)+150),32,50);
                let material = new THREE.MeshLambertMaterial({color: 0xDCDCDC});
                window["moon"+i] = new THREE.Mesh(geometry,material);
                window["moon"+i].position.x = 15000;
                window["orbit"+i] = new THREE.Object3D();
                window["orbit"+i].rotation.y -= Math.floor((Math.random() * numberOfMoons) + i);
                window["orbit"+i].rotation.z -= Math.floor((Math.random() * numberOfMoons) + i);
                window["orbit"+i].add(window["moon"+i]);
                jupiterMoonsOrbits.add(window["orbit"+i]);
                planet.add(jupiterMoonsOrbits);
            }
            break;
            case "Saturn":
            {
                let geometry = new THREE.SphereGeometry((Math.random()*(800-150)+150),32,50);
                let material = new THREE.MeshLambertMaterial({color: 0xDCDCDC});
                window["moon"+i] = new THREE.Mesh(geometry,material);
                console.log("Creating moon: "+i+" for "+name);
                window["moon"+i].position.x = 15000;
                window["orbit"+i] = new THREE.Object3D();
                window["orbit"+i].rotation.y -= Math.floor((Math.random() * numberOfMoons) + i);
                window["orbit"+i].rotation.z -= Math.floor((Math.random() * numberOfMoons) + i);
                window["orbit"+i].add(window["moon"+i]);
                planet.add(saturnMoonsOrbits);
                saturnMoonsOrbits.add(window["orbit"+i]);
            }
            break;
            case "Uranus":
            {
                let geometry = new THREE.SphereGeometry((Math.random()*(700-150)+150),32,50);
                let material = new THREE.MeshLambertMaterial({color: 0xDCDCDC});
                window["moon"+i] = new THREE.Mesh(geometry,material);
                console.log("Creating moon: "+i+" for "+name);
                window["moon"+i].position.x = 9000;
                window["orbit"+i] = new THREE.Object3D();
                window["orbit"+i].rotation.y -= Math.floor((Math.random() * numberOfMoons) + i);
                window["orbit"+i].rotation.z -= Math.floor((Math.random() * numberOfMoons) + i);
                window["orbit"+i].add(window["moon"+i]);
                planet.add(uranusMoonsOrbit);
                uranusMoonsOrbit.add(window["orbit"+i]);
            }
            break;
            case "Neptune":
            {
                let geometry = new THREE.SphereGeometry((Math.random()*(600-150)+150),32,50);
                let material = new THREE.MeshLambertMaterial({color: 0xDCDCDC});
                window["moon"+i] = new THREE.Mesh(geometry,material);
                console.log("Creating moon: "+i+" for "+name);
                window["moon"+i].position.x = 9000;
                window["orbit"+i] = new THREE.Object3D();
                window["orbit"+i].rotation.y -= Math.floor((Math.random() * numberOfMoons) + i);
                window["orbit"+i].rotation.z -= Math.floor((Math.random() * numberOfMoons) + i);
                window["orbit"+i].add(window["moon"+i]);
                planet.add(neptuneMoonsOrbit);
                neptuneMoonsOrbit.add(window["orbit"+i]);
            }
            break;
            default:
            {
                let geometry = new THREE.SphereGeometry(150,32,50);
                let material = new THREE.MeshLambertMaterial({color: 0xDCDCDC});
                let moon = new THREE.Mesh(geometry,material);
                moon.position.x = 1500;
                planet.add(planetOrbit);
                planetOrbit.add(moon);
            }
            break;
        }   
    }
}
function createRing(distance){
    var geometry = new THREE.RingGeometry(distance,(distance+100), 100);
    var material = new THREE.MeshBasicMaterial( { color: 0xA9A9A9, side: THREE.DoubleSide } );
    var mesh = new THREE.Mesh( geometry, material );
    scene.add(mesh);
}
function rotateMoons(){
    switch (angel){
        case "y":
        {
        earthMoonOrbit.rotation.y +=earthMoonSpeed;
        marsMoonOrbit1.rotation.y += marsMoonSpeed;
        marsMoonOrbit2.rotation.y += marsMoonSpeed;
        jupiterMoonsOrbits.rotation.y += jupiterMoonSpeed;
        saturnMoonsOrbits.rotation.y += saturnMoonSpeed;
        neptuneMoonsOrbit.rotation.y += neptuneMoonSpeed;
        uranusMoonsOrbit.rotation.y += uranusMoonSpeed;
        angel="z";
        break;
        }
        case "z":
        {
        earthMoonOrbit.rotation.z +=earthMoonSpeed;
        marsMoonOrbit1.rotation.z += marsMoonSpeed;
        marsMoonOrbit2.rotation.z += marsMoonSpeed;
        jupiterMoonsOrbits.rotation.z += jupiterMoonSpeed;
        saturnMoonsOrbits.rotation.z += saturnMoonSpeed;
        neptuneMoonsOrbit.rotation.z += neptuneMoonSpeed;
        uranusMoonsOrbit.rotation.z += uranusMoonSpeed;
        angel="y";
        break;
        }
    }
}
function render() {
    //update the controlls
    trackballControls.update(clock.getDelta());
    //controls.update(clock.getDelta());
    renderer.render(scene, camera);

    /*var time = Date.now() * 0.0005;

    sun.position.x = Math.cos( time * 10 ) * 5;
	sun.position.y = Math.cos( time * 7 ) * 3;
    sun.position.z = Math.cos( time * 7 ) * 3;*/

    mercuryOrbit.rotation.z += mercurySpeed;
    venusOrbit.rotation.z += venusSpeed;
    earthOrbit.rotation.z += earthSpeed;
    marsOrbit.rotation.z += marsSpeed;
    jupiterOrbit.rotation.z += jupiterSpeed;
    saturnOrbit.rotation.z += saturnSpeed;
    uranusOrbit.rotation.z += uranusSpeed;
    neptuneOrbit.rotation.z += neptuneSpeed;
    plutoOrbit.rotation.z += plutoSpeed;

    rotateMoons();


    //to call itself
    requestAnimationFrame(render);
}
//launch
window.onload = () => {

    init();
    addaxesHelper();
    createSun();
    createMercury();
    createVenus();
    createEarth();
    createMars();
    createJupiter();
    createSaturn();
    createUranus();
    createNeptune();
    createPluto();
    setupCamera();
    render();
}