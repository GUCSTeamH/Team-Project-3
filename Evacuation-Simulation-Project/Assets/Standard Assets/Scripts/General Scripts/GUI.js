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
var children="10";
var women="40";

var minX : int = 0; // min spawn range

var maxX : int = 8; // maxspawn range

var minY: int = 0;

var maxY: int = 25;

var randomPos :Vector3; // random position genearted

var checkposition:Vector3;  // used to check wether the position is already in the array

var place:boolean = true; // can the object be placed?

var objectPosition = new Array(); // array that contains used  up positions

function OnGUI()
{

    	total = GUILayout.TextField (total, 25);
    	if(total!="")
    		num=parseInt(total);
    	else 
    		num=0;
    		
    		
    	aggressiveness = GUILayout.TextField (aggressiveness, 50);
    	if(aggressiveness!="")
    		aggressive=parseInt(aggressiveness);
    	else 
    		aggressive=0;
    		
    		
    		
    	children = GUILayout.TextField (children, 75);
    	if(children!="")
    		c=parseInt(children);
    	else 
    		c=0;
    		
    		
    		
    	women = GUILayout.TextField (women, 100);
    	if(women!="")
    		w=parseInt(women);
    	else 
    		w=0;
    		
    		
    		
    gridX=num;
 //   print(aggressive);
//    print(c);
    if (GUI.Button(Rect(40,10,50,50),"Start"))
			//StartB(aggressive,c,w);
			Application.LoadLevel("scene3");
			StartA(num,aggressive,c,w);
    	
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
		aisle();
       

        // create an Object for each level

        for (var i = 0; i < t; i++)

            {

                // create a randomposition

                randomPos = Vector3(Random.Range(minX,maxX) * spacing ,0,Random.Range(minY,maxY));
				print(randomPos);
                //start searchig for values in the array

                place = true;

               

                for ( checkposition in objectPosition)

                    {

                        //if the value is not inside the array

                        if ( checkposition == randomPos)

                            {

                                place = false;

                            }

                    }

       

                if (place == true)

                    {

                        //spawn an object
                        prefab=Instantiate(prefab,randomPos, transform.rotation);
           				prefab.renderer.material.color=Color.white;
            			array.Push(prefab);
                        objectPosition.Add(randomPos);

                    }

            }
            ChooseSet(a,c,w);

    }
