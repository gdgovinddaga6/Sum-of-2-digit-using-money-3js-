var mySceneTLX;
var mySceneTLY;
var mySceneBRX;
var mySceneBRY;
var mySceneW;
var mySceneH;
var myCenterX;
var myCenterY;


var font,flag = Math.floor(Math.random()*100) ,text;
var flag2 = Math.floor(Math.random()*100);
var res = flag+flag2;
var hmc, numberTextLoaded = 0;
var note1Flag=0,coin1flag = 0;

var numberLabel1;
var numberLabel2;
var minNumber, maxNumber, numberStep,num1,num2;

var num1Coins = [], num2Coins = [], resCoins = [];
 var cube1 = new Array(9);
 var v = 1; 

function initialiseScene()
{

    mySceneTLX = -10.0;
    mySceneTLY = 10.0;
    mySceneBRX = 10.0;
    mySceneBRY = -10.0;
    mySceneW   = (mySceneBRX - mySceneTLX);
    mySceneH   = (mySceneTLY - mySceneBRY);
    myCenterX  = (mySceneTLX + mySceneBRX) / 2.0;
    myCenterY  = (mySceneTLY + mySceneBRY) / 2.0;
    myCenterZ  = -2.0;

    PIEscene.background=new THREE.Color( 0xbfd1e5 );
    PIEscene.add(new THREE.AmbientLight(0x606060));
}
function loadFont()
{
    loader = new THREE.FontLoader();
    loader.load("fonts/optimer.json", function(response){
        font = response;
    });
}
function loadExperimentElements()
{

    PIEsetExperimentTitle("Two digit addition using money");
    PIEsetDeveloperName("Govind Daga");

    loadFont();
    initialiseScene();

    setSlider();

    PIEsetAreaOfInterest(mySceneTLX, mySceneTLY, mySceneBRX, mySceneBRY);

    // for texture



}

function getGeometry(data, size)
{
    geometry = new THREE.TextGeometry(data, {
            font : font,
            size : size ,
            height : 0.01,
            curveSegments : 3
    });
    return geometry;
}

function resetExperiment()
{
  initialiseScene();

  num1 = getNumber();
  num2 = getNumber();

  PIEchangeInputSlider(numberLabel2,num2);
  PIEchangeInputSlider(numberLabel1,num1);

}
var coinIndex = -1,coinsRemoved = 0, carryNote;
function updateExperimentElements(t, dt)
{
	
    


  if(font && !numberTextLoaded) {
  test();

  verticalLine();
  horizontalLine1();
  horizontalLine2();
  horizontalLine3();
  
  
  
}   
   if(note1Flag == 1){
	   if(t>10000 && t<=20000)
		{
			// alert('hii');
		// console.log(myCenterY - cube1[0].position.y);
	   cube1[0].position.y -= 0.3;
		}
   }
   

    
   if(coin1flag == 1) {
     
      if(coinIndex == 10)
      {
          if(!coinsRemoved)
          {
            removeCoins(9);
          }
          else if(!carryNote)
          {
            //alert("Coin Added !!")
            carryNote =  cube1[0].clone();
            carryNote.position.set(myCenterX+8, myCenterY-6,0);
            PIEaddElement(carryNote);
          }
          else if(carryNote.position.x > (myCenterX-7))
          {
            carryNote.position.set(carryNote.position.x - 0.08,myCenterY-6,0);
          }
          else
            coinIndex++;
      }
      else if(coinIndex == -1)
          coinIndex = 0;
      else if(t>3000 && t<20000)
      {
        var dist;
        if(coinIndex%10 > 4)
            dist = myCenterY - 7;
        else
            dist = myCenterY - 6;

        if(num1Coins[coinIndex].position.y >= dist)
          num1Coins[coinIndex].position.y -= 0.3;
        else
          coinIndex++;
      }
      //num1Coins--;
     // v++;

   //}
	}
}

function removeCoins(n)
{
  for(var i=0; i<=n; i++)
  {
    PIEremoveElement(num1Coins[i]);
    coinsRemoved = 1;
    //num1Coins[i]="null";
  }
}

function addnotes(){
  var notes1 = num1/10;
  var notes2 = num2/10;
  var geometry = new THREE.BoxGeometry(8,3);
  // var material = new THREE.MeshBasicMaterial( {color: 0x0000ff  } );
  var imgUtils = THREE.ImageUtils.loadTexture('10rs.png',{},function(){PIErender();});
  var material = new THREE.MeshBasicMaterial(
  {
      transparent: true,
      map: imgUtils
  });
  //var cube1 = new Array(Math.floor(notes1));
  var x =0;
  var y = 0;
  var z =0;
  for(var i=0; i <Math.floor(notes1); i++)
  {
    cube1[i] = new THREE.Mesh( geometry, material );
    cube1[i].position.set(myCenterX-4+x,myCenterY+6+y,0);
    PIEaddElement( cube1[i] );
    y -= 0.3;
    x += 0.3;
  }
  note1Flag = 1;
  // var cube2 = cube.clone();
  // cube2.position.set(myCenterX-4,myCenterY+5.3,-4);
  // PIEaddElement(cube2);
  //
  console.log("notes1");
}

function addnotes2() {
  var notes1 = num1/10;
  var notes2 = num2/10;
  var geometry = new THREE.BoxGeometry(8,3);
  // var material = new THREE.MeshBasicMaterial( {color: 0x0000ff  } );
  var imgUtils = THREE.ImageUtils.loadTexture('10rs.png',{},function(){PIErender();});
  var material = new THREE.MeshBasicMaterial(
  {
      transparent: true,
      map: imgUtils
  });
  var cube1 = new Array(Math.floor(notes2));
  var x =0;
  var y = 0;
  var z =0;
  for(var i=0; i <Math.floor(notes2); i++)
  {
    cube1[i] = new THREE.Mesh( geometry, material );
    cube1[i].position.set(myCenterX-5.5 +x,myCenterY-0.8+y,0);
    PIEaddElement( cube1[i] );
    y -=0.2;
    x += 0.4;
  }

}

function addCoins()
{
  var x= myCenterX + 5;
  var y = myCenterY + 6;
  var z = 0;
  var imgUtils = THREE.ImageUtils.loadTexture('1rs.png',{},function(){PIErender();});
  var material = new THREE.MeshBasicMaterial(
  {
      transparent: true,
      map: imgUtils
  });

    for(var i =0; i<num1%10;i++)
    {
        geometry = new THREE.CircleGeometry(1,64);
        //material = new THREE.MeshBasicMaterial({color : 0xffffff});
        num1Coins[i] = new THREE.Mesh(geometry, material);
        num1Coins[i].position.set(x,y,0);
        PIEaddElement(num1Coins[i]);
        x = x + 3;
        if(i==4)
        {
           x = myCenterX + 5;
           y = y - 2.5;
        }
    }
    coin1flag= 1;
}

function addCoins1()
{
  var x= myCenterX + 5;
 var y = myCenterY - 0.2;
 var z = 0;
 var imgUtils = THREE.ImageUtils.loadTexture('1rs.png',{},function(){PIErender();});
 var material = new THREE.MeshBasicMaterial(
 {
     transparent: true,
     map: imgUtils
 });
    for(var i =num1%10;i<(num1%10+num2%10);i++)
    {
        geometry = new THREE.CircleGeometry(1,64);
      //  material = new THREE.MeshBasicMaterial({color : 0xffffff});
        num1Coins[i] = new THREE.Mesh(geometry, material);
        num1Coins[i].position.set(x,y,0);
        PIEaddElement(num1Coins[i]);
        x = x + 3;
        if(i==(num1%10+4))
        {
           x = myCenterX + 5;
           y = y - 2.5;
        }
    }
}

function test()
{
  if(text)
    PIEremoveElement(text);
  ////alert(num1+" "+num2);
  geometry = getGeometry('  '+num1,1);
  material = new THREE.MeshBasicMaterial({color:0xffffff});
  text = new THREE.Mesh(geometry, material);
  text.position.set(-15,5,5);
  PIEaddElement(text);

/*  geometry = getGeometry("Number 1",0.5);
  material = new THREE.MeshBasicMaterial({color:0xffffff});
  text = new THREE.Mesh(geometry, material);
  text.position.set(-14,5,5);
  PIEaddElement(text);*/

  geometry = getGeometry('  '+num2,1);
  material = new THREE.MeshBasicMaterial({color:0xffffff});
  text = new THREE.Mesh(geometry, material);
  text.position.set(-15,3,5);
  PIEaddElement(text);

/*  geometry = getGeometry("Number 2",0.5);
  material = new THREE.MeshBasicMaterial({color:0xffffff});
  text = new THREE.Mesh(geometry, material);
  text.position.set(-14,3,5);
  PIEaddElement(text);*/

  geometry = getGeometry("+",1);
  material = new THREE.MeshBasicMaterial({color:0xffffff});
  text = new THREE.Mesh(geometry, material);
  text.position.set(-17,3.1,3);
  PIEaddElement(text);

  res = num1 + num2;
  geometry = getGeometry(res,1);
  material = new THREE.MeshBasicMaterial({color:0xffffff});
  text = new THREE.Mesh(geometry, material);
  if(res<100)
  {
    text.position.set(-15,1,3);

  } else {
    text.position.set(-16,1,3);
  }
 
  PIEaddElement(text);

  numberTextLoaded = 1;


/*  geometry = getGeometry("Result of Sum of 2 Numbers",0.5);
  material = new THREE.MeshBasicMaterial({color:0xffffff});
  text = new THREE.Mesh(geometry, material);
  text.position.set(-14,1,3);
  PIEaddElement(text);*/

    addnotes();
    addnotes2();
    addCoins1();
    addCoins();
    countcoins();
    countcoins2();
    countnotes();
    countnotes2(); 
line();


}

function getNumber1(newValue)
{
    num1 = newValue;
    ////alert(num1);

}

function getNumber()
{
    var min = 10;
    var max = 99;
    var decimalPlaces = 0;

    var rand = Math.random()*(max-min) + min;
    var power = Math.pow(10, decimalPlaces);
    return Math.floor(rand*power) / power;
}

function getNumber2(newValue)
{
    num2 = newValue;
    ////alert(num1);
}

function setSlider()
{
    setSliderVariables();
    num1 = getNumber();
    num2 = getNumber();
    PIEaddInputSlider(numberLabel1, num1, getNumber1, minNumber, maxNumber, numberStep);
    PIEaddInputSlider(numberLabel2, num2, getNumber2, minNumber, maxNumber, numberStep);
}

function setSliderVariables()
{
    numberLabel1 = "Number 1";
    numberLabel2 = "Number 2";

    minNumber  = 10;
    maxNumber  = 99;
    numberStep = 1;
}


function line(){
  geometry = new THREE.Geometry();
  geometry.vertices.push(
      new THREE.Vector3( 0,2, 0),
      new THREE.Vector3( 0,2,0),
  new THREE.Vector3( 5, 2 ,0)
  );
  mulLine = new THREE.Line( geometry, new THREE.LineBasicMaterial({color: 0xffffff}));
  mulLine.position.set(-18.5,myCenterY+1,0);
  PIEaddElement(mulLine);
}

function verticalLine() {

  var material = new THREE.LineBasicMaterial({
  	color: 0x0000ff
  });

  var geometry = new THREE.Geometry();
  geometry.vertices.push(
  	new THREE.Vector3( 3, -9, 0),
  	new THREE.Vector3( 3,9, 0 ),
  	//new THREE.Vector3( 20, -10, 5 ),
  //new THREE.Vector3(-20,5,-18),

  );

  var line = new THREE.Line( geometry, material );
  PIEaddElement( line );

}



function horizontalLine1() {

  var material = new THREE.LineBasicMaterial({
  	color: 0x0000ff
  });

  var geometry = new THREE.Geometry();
  geometry.vertices.push(
    new THREE.Vector3(-9,8,0 ),
  new THREE.Vector3(10,8,0),
  new THREE.Vector3(18,8,0)


  );

  var line = new THREE.Line( geometry, material );
  PIEaddElement( line );

}


function horizontalLine2() {

  var material = new THREE.LineBasicMaterial({
  	color: 0x0000ff
  });

  var geometry = new THREE.Geometry();
  geometry.vertices.push(
    	new THREE.Vector3( 14, 1.3,10 ),
      // new THREE.Vector3(5,5,5)
  new THREE.Vector3(-13,2,-10)

  );

  var line = new THREE.Line( geometry, material );
  PIEaddElement( line );

}


function horizontalLine3() {

  var material = new THREE.LineBasicMaterial({
  	color: 0x0000ff
  });

  var geometry = new THREE.Geometry();
  geometry.vertices.push(
    	new THREE.Vector3( 11, -2.5,15 ),
    //new THREE.Vector3(8,5,6)
  new THREE.Vector3(-13,-5.1,-10)

  );

  var line = new THREE.Line( geometry, material );
  PIEaddElement( line );

}



function countcoins()
{
  geometry = getGeometry( num1 % 10+' coins' , 0.5 );
  material = new THREE.MeshBasicMaterial({color:0xffffff});
  text = new THREE.Mesh(geometry, material);
  text.position.set(+15,2,3);
  PIEaddElement(text);
}

function countcoins2()
{
  geometry = getGeometry( num2 % 10+' coins' , 0.5 );
  material = new THREE.MeshBasicMaterial({color:0xffffff});
  text = new THREE.Mesh(geometry, material);
  text.position.set(+15,-3,3);
  PIEaddElement(text);
}

function countnotes()
{
  geometry = getGeometry( Math.floor(num1 / 10) +' notes' , 0.5 );
  material = new THREE.MeshBasicMaterial({color:0xffffff});
  text = new THREE.Mesh(geometry, material);
  text.position.set(-11,2,3);
  PIEaddElement(text);
}
function countnotes2()
{
  geometry = getGeometry(Math.floor( num2 / 10) +' notes' , 0.5 );
  material = new THREE.MeshBasicMaterial({color:0xffffff});
  text = new THREE.Mesh(geometry, material);
  text.position.set(-11,-3,3);
  PIEaddElement(text);
}

