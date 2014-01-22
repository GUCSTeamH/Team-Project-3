var prefab : GameObject;
var gridX = 0;
var gridY = 5;
var spacing = 2.0;
public var array= new Array();
var n=0;
var num = 5;
var text;
var total : String = "100";
var aggressiveness = "10";
var aggressive=10;

var children="10";

var c=10;

var women="40";

var w = 40;

var start =false;

var labels=false;

var isPaused=false;

var floor : GameObject;

var seats : GameObject [];

var minX : int = 0; // min spawn range

var maxX : int = 8; // maxspawn range

var minY: int = 0;  

var maxY: int = 25;

var randomPos :Vector3; // random position genearted

var checkposition:Vector3;  // used to check wether the position is already in the array

var place:boolean = true; // can the object be placed?

var objectPosition = new Array(); // array that contains used  up positions

var yes=false;
var label;
var timer : float = 0.0;

var windowRect = Rect (20, 20, 120, 50);


function U()
{
timer=0;

InvokeRepeating("Update1", 1,1);

}

function Update1()
{

	GUI.Label(Rect(110, 10, 140, 20), timer.ToString());
	    timer += 1;

 
}


function OnGUI()
{
		GUI.Label (Rect (30, 0, 100, 30), "total");
		if(labels==false){
    	total = GUILayout.TextField (total, 25);
    	if(total!="")
    		num=parseInt(total);
    	else 
    		num=0;
    		
    	}
    	else {
    	     GUILayout.Label (num.ToString());
    	   }
    	   
    	   
    	   
    	GUI.Label (Rect (30, 25, 100, 30), "aggressive");
    	
    	if(labels==false) {
    	
    	
    		aggressiveness = GUILayout.TextField (aggressiveness, 50);
    		if(aggressiveness!="")
    			aggressive=parseInt(aggressiveness);
    		else 
    			aggressive=0;
    	}
    	else {
    		GUILayout.Label (aggressive.ToString());
    		
    	}
    		
    		
    	GUI.Label (Rect (30, 50, 100, 30), "children");
    	
    	if(labels==false) {
    			children = GUILayout.TextField (children, 75);
    			if(children!="")
    				c=parseInt(children);
    			else 
    				c=0;
    	}
    	else {
    		
    		GUILayout.Label (c.ToString());
    	}
    		
    	GUI.Label (Rect (30, 75, 100, 30), "women");
    	if (labels==false) {
    		
    		women = GUILayout.TextField (women, 100);
    		if(women!="")
    			w=parseInt(women);
    		else 
    			w=0;
    	}
    	else {
    	
    		GUILayout.Label (w.ToString());
    	
    	}
    		
    		
    		
    gridX=num;
 //   print(aggressive);
//    print(c);
	if(start==false){
    if (GUI.Button(Rect(0,100,100,40),"Start")){
			//StartB(aggressive,c,w);
			U();
			StartA(num,aggressive,c,w);
			start=true;
			labels=true;
			}
			
	}
	if (GUI.Button(Rect(0,200,100,40),"Quit")){
			//StartB(aggressive,c,w);
		Application.Quit();
		print("quit");
		
		}
		if (GUI.Button(Rect(0,150,100,40),"Pause")){
			//StartB(aggressive,c,w);
			
		Pause();
		print("Pause");
		
		}			
		GUI.Box (Rect (Screen.width - 110, 10, 100, 100), "Results");	
		GUILayout.BeginArea (Rect (Screen.width - 110, 30, 100, 80));
		GUILayout.BeginVertical();
		GUILayout.BeginHorizontal();
		GUILayout.Label("time: ");		
		GUILayout.Label(timer.ToString());
		GUILayout.EndHorizontal();
		GUILayout.BeginHorizontal();
		GUILayout.Label("evacuated: ");		
		GUILayout.Label("0");
		GUILayout.EndHorizontal();
		GUILayout.EndVertical();		
		GUILayout.EndArea();
		
		
		if(yes){
	
	GUI.Box (Rect (Screen.width/2 - 50, Screen.height/2-50, 120, 130),"Warning!");	    	// Make a group on the center of the screen
	GUILayout.BeginArea (Rect (Screen.width/2 - 50, Screen.height/2-30, 120, 110));
	GUILayout.BeginVertical();

	GUILayout.Label("You try to add more people than the capacity of the plane. All the seats will be used instead.");
	if(GUILayout.Button ("OK")){
	yes=false;
	}

	// End the group we started above. This is very important to remember!
	GUILayout.EndVertical();
	GUILayout.EndArea();
	}
    	
}	


	function DoMyWindow (windowID : int) {
		//if (GUI.Button (Rect (10,20,100,20), "Get results"))
			//print ("Got a click");
	}
//http://answers.unity3d.com/questions/50246/how-to-make-a-pause-function.html
function Pause()
{
if (isPaused == true)
{
Time.timeScale = 1;
isPaused = false;
}
else
{
Time.timeScale = 0;
isPaused = true;
}
}
function StartB (a: int,c:int,w:int) {

    for (var y = 0; y < gridY; y++) {
        for (var x=0;x<gridX;x++) {
            var pos = Vector3 (x, 0, y) * spacing;
            prefab=Instantiate(prefab, pos, Quaternion.identity);
            prefab.renderer.material.color=Color.white;
            array.Push(prefab);
            n++;
        }
    }
    ChooseSet(a,c,w);
}




function ChooseSet(aggressive: int, children : int, women : int) {
	var a = aggressive;
	var c = children;
	var w=women;
	print(a);
	print(c);
	print(w);
	for (numLeft = array.length; numLeft > 0; numLeft--) {
	
			if (a == 0)
				break;
		var random1=Random.Range(0,array.length);
			if(array[random1].renderer.material.color==Color.white){
			array[random1].renderer.material.color=Color.red;
			a--;

		}
		}
	for (numLeft = array.length; numLeft > 0; numLeft--) {
	
			if (c == 0)
				break;
		var random2=Random.Range(0,array.length);
			if(array[random2].renderer.material.color==Color.white){
			array[random2].renderer.material.color=Color.yellow;
			c--;

		}
		}
	for (numLeft = array.length; numLeft > 0; numLeft--) {
	
			if (w == 0)
				break;
		var random3=Random.Range(0,array.length);
			if(array[random3].renderer.material.color==Color.white){
			array[random3].renderer.material.color=Color.magenta;
			w--;

		}
		}
}


function aisle()
{
	
	for (y=minY;y<=maxY;y++)
	{
		a=Vector3(3 * spacing,0,y);
		b=Vector3(4 * spacing,0,y);
		objectPosition.Add(a);
		objectPosition.Add(b);
	
	
	}
}
function StartA (t : int, a: int,c:int,w:int)

    {
    print("position");
    print(floor.transform.position);
    print("end of position");
    
		aisle();
    if(t>116) {
    t=116;
    yes=true;
    num = 118;

	
	  
	    }  

        // create an Object for each level
	var i = 0;
        while ( i < t)

            {

                // create a randomposition
                rand=seats[Random.Range(0,116)].transform.position;
                //print(rand+"raaaaaaaaaaaaaaaaaaaaaand");
                //prefab=Instantiate(prefab,rand, transform.rotation);
                //prefab.transform.position.y=prefab.transform.position.y+1;
           		//prefab.renderer.material.color=Color.black;
                //print("rand");

                //randomPos = Vector3(Random.Range(minX,maxX) * spacing ,0,Random.Range(minY,maxY));
				//zzzzzzzzzzzprint(randomPos);
                //start searchig for values in the array

                place = true;

               

                for ( checkposition in objectPosition)

                    {

                        //if the value is not inside the array

                        if ( checkposition == rand)

                            {

                                place = false;

                            }

                    }

       

                if (place == true)

                    {

                        //spawn an object
                        prefab=Instantiate(prefab,rand, transform.rotation);
                        prefab.transform.position.y=prefab.transform.position.y+0.5;
           				prefab.renderer.material.color=Color.white;
            			array.Push(prefab);
                        objectPosition.Add(rand);
                        i++;

                    }

            }
            ChooseSet(a,c,w);

    }

