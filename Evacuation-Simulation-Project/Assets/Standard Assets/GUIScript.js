var plane_capacity = 178; 


var timer : Component;


var passenger : GameObject;


var spacing = 2.0;

var style : GUIStyle;

public var passengers= new Array();


var total  = "178";
var behaviour_boarded = 178;
var age_boarded = 178;

var altruism = "0";
var altruism_boarded : int;

var behaviouralinaction = "0";
var behaviouralinaction_boarded : int;

var fearflight = "0";
var fearflight_boarded : int;

var panic = "0";
var panic_boarded : int;

var overfifty="0";
var overfifty_boarded : int;

var women = "40";
var women_boarded : int;

var start =false;

var labels=false;

var isPaused=false;

var evacuated : int = 0;

var panicCount : int = 0;
var behaviouralInactionCount : int = 0;
var fearFlightCount : int = 0;
var altruismCount : int = 0;

var seats : GameObject [];


var minY: int = 0;  
var maxY: int = 25;


var occupied_seats = new Array(); // array that contains used  up positions

var passengers_active : GameObject [];

//var font : Font;

function Start(){
		//GUI.skin.label.font = font;
		//GUI.skin.label.fontSize=5;

}

function getAltruism(){
	return altruism;
}

function getBehaviouralInaction(){
	return behaviouralinaction;
}

function getFearFlight(){
	return fearflight;
}

function getPanic(){
	return panic;
}

function total_determinator(){
		GUI.Label (Rect (30, 0, 100, 30), "total");
		if(labels == false){
    		total = GUILayout.TextField (total, 25);
    		Debug.Log ("total = " + total);
    		if(total != ""){
    			behaviour_boarded = parseInt(total);
    			if (behaviour_boarded > 178){ //user entered more than the capacity of the plane
    				warning_exceeding_number();
    				//total_boarded = 178;
    			}
    		}
    		else                          //should prompt the user to enter something
    			behaviour_boarded = 178;        //should be changed - mock up for now
    		
    	}
    	else {
    	     GUILayout.Label (behaviour_boarded.ToString());
    	}
}

function altruism_determinator(){
	style.normal.textColor = Color.green;
	GUI.Label (Rect (30, 25, 120, 30), "Altruism", style);
    if(labels == false) {
    	altruism = GUILayout.TextField (altruism, 50);
    
    	if(altruism != ""){
    		altruism_boarded = parseInt(altruism);
    		if(altruism_boarded > behaviour_boarded)     //if user entered a greater value than the total passengers
    			warning_exceeding_number();
    	}
    	else 
    		altruism_boarded = 0;     //change to ask the user to enter a value
    		behaviour_boarded -= altruism_boarded;
    }
    else {
    	GUILayout.Label (altruism_boarded.ToString());	
    }
}

function behaviouralinaction_determinator(){
	style.normal.textColor = Color.yellow;
	GUI.Label (Rect (30, 50, 120, 30), "Behavioural Inaction", style);
    if(labels == false) {
    	behaviouralinaction = GUILayout.TextField (behaviouralinaction, 50);
    	if(behaviouralinaction != ""){
    		behaviouralinaction_boarded = parseInt(behaviouralinaction);
    		if(behaviouralinaction_boarded > behaviour_boarded)     //if user entered a greater value than the total passengers
    			warning_exceeding_number();
    	}
    	else 
    		behaviouralinaction_boarded = 0;     //change to ask the user to enter a value
    		behaviour_boarded -= behaviouralinaction_boarded;
    }
    else {
    	GUILayout.Label (behaviouralinaction_boarded.ToString());	
    }
}

function fearflight_determinator(){
	style.normal.textColor = Color.black;
	GUI.Label (Rect (30, 75, 120, 30), "Fear-Flight", style);
    if(labels == false) {
    	fearflight = GUILayout.TextField (fearflight, 50);
    	if(fearflight != ""){
    		fearflight_boarded = parseInt(fearflight);
    		if(fearflight_boarded > behaviour_boarded)     //if user entered a greater value than the total passengers
    			warning_exceeding_number();
    	}
    	else 
    		fearflight_boarded = 0;     //change to ask the user to enter a value
    		behaviour_boarded -= fearflight_boarded;
    }
    else {
    	GUILayout.Label (fearflight_boarded.ToString());	
    }
}

function panic_determinator(){
	style.normal.textColor = Color.red;
	GUI.Label (Rect (30, 100, 120, 30), "Panic", style);
    if(labels == false) {
    	panic = GUILayout.TextField (panic, 50);
    	if(panic != ""){
    		panic_boarded = parseInt(panic);
    		if(panic_boarded > behaviour_boarded)     //if user entered a greater value than the total passengers
    			warning_exceeding_number();
    	}
    	else 
    		panic_boarded = 0;     //change to ask the user to enter a value
    		behaviour_boarded -= panic_boarded;
    }
    else {
    	GUILayout.Label (panic_boarded.ToString());	
    }
}

/*function overfifty_determinator(){
	GUI.Label (Rect (150, 25, 100, 30), "Over Fifty");
    	
    if(labels==false) {
    	overfifty = GUILayout.TextField (overfifty, 75);
    	if(overfifty != ""){
    	
    		overfifty_boarded = parseInt(overfifty);
    		if(overfifty_boarded > age_boarded)     //if user entered a greater value than the total passenger
    			warning_exceeding_number();
    		
    	}
    	else 
    		overfifty_boarded = 0;
    		age_boarded -= overfifty_boarded;
    }
    else {	
    	GUILayout.Label (overfifty_boarded.ToString());
    }
}*/
    	
function women_determinator(){
	    		
    GUI.Label (Rect (30, 75, 100, 30), "women");
    if (labels==false) {	
    	women = GUILayout.TextField (women, 100);
    	if(women!=""){
    	
    		women_boarded=parseInt(women);
    		if(women_boarded > behaviour_boarded)     //if user entered a greater value than the total passengers
    			warning_exceeding_number();
    		
    	}
    	else 
    		women_boarded=0;
    }
    else {
    	GUILayout.Label (women_boarded.ToString());
    }	
    
}
// label factory - doesn't work

function determinator(x : int, y : int, width : int, height : int, label : String, text_variable : String, variable : int){
	GUI.Label (Rect (x, y, width, height), label);
    	if(labels == false) {
    			text_variable = GUILayout.TextField (text_variable, 25);
    			print (text_variable);
    			if(text_variable != ""){
    				variable = parseInt(text_variable);
    				print(variable + "v");
    			}
    				//check if greater than a specific number...
    			else 
    				variable = 0;
    	}
    	else {
    		
    		GUILayout.Label (variable.ToString());
    	}
}		

function OnGUI()
{
	
	total_determinator();
	altruism_determinator();
	behaviouralinaction_determinator();
	fearflight_determinator();
	panic_determinator();
	/*overfifty_determinator();*/
	/*children_determinator();*/
	/*women_determinator();*/
	initialise_results_box();
	//determinator(120,34,56,75,"women",women,women_boarded);

    
    //starting the animation
	if(start == false){
		for (var passenger : GameObject in passengers_active){
			passenger.active = false;
			/*var type = passenger.actionContext.getContextItem("type");
			if (type === "panic"){
				panicCount++;
			}
			if (type === "altruism"){
				altruismCount++;
			}
			if (type === "behaviouralinaction"){
				behaviouralInactionCount++;
			}
			if (type === "panic"){
				panicCount++;
			}*/
		}
		
    	if (GUI.Button(Rect(0,130,100,40),"Start")){
			timer.start_timer();
			//instantiate_passengers();
			//initialise_results_box();
			
			start=true;
			labels=true;
			if (altruism_boarded == 0 || panic_boarded == 0 || behaviouralinaction_boarded == 0 || fearflight_boarded == 0 ) {
				for (var passenger : GameObject in passengers_active) {
					passenger.active = true;
					passenger.GetComponent("Attribute").StartBeh();
				}
			} else {
				Debug.Log("manual behaviour");
				var altr_count : int = 0;
				var panic_count : int = 0;
				var behav_count : int = 0;
				var fear_count : int  = 0;
				for (var passenger : GameObject in passengers_active) {
					if (altr_count < altruism_boarded) {
						passenger.active = true;
						passenger.GetComponent("Attribute").SetTypeManual("altruism");
						passenger.GetComponent("Attribute").StartBehManual();
						altr_count++;
						continue;
					} else if (panic_count < panic_boarded) {
						passenger.active = true;	
						passenger.GetComponent("Attribute").SetTypeManual("panic");
						passenger.GetComponent("Attribute").StartBehManual();
						panic_count++;
						continue;
					} else if (behav_count < behaviour_boarded) {
						passenger.active = true;	
						passenger.GetComponent("Attribute").SetTypeManual("behaviouralinaction");
						passenger.GetComponent("Attribute").StartBehManual();
						behav_count++;
						continue;
					} else if (fear_count < fearflight_boarded) {
						passenger.active = true;
						passenger.GetComponent("Attribute").SetTypeManual("fearflight");
						passenger.GetComponent("Attribute").StartBehManual();
						fear_count++;
						continue;
					}
				}
				
			}
		}
	}
	
	
	//quitting the animation
	if (GUI.Button(Rect(0,230,100,40),"Main Menu")){
	
		Application.LoadLevel("Main Menu");
		
	}
	
	
	//pausing the animation
	if (GUI.Button(Rect(0,180,100,40),"Pause")){
			
		pause();;
		
	}	
	
	//restarting the animation
	if (GUI.Button(Rect(0,280,100,40),"Restart")){
		
		Application.LoadLevel("A320Scene (No Behaviour)");
	
	}
				
    	
}	

public function updateEvac(){
	evacuated++;
}

function initialise_results_box(){

		GUI.Box (Rect (Screen.width - 110, 10, 100, 100), "Results");	
		GUILayout.BeginArea (Rect (Screen.width - 110, 30, 100, 80));
		GUILayout.BeginVertical();
		GUILayout.BeginHorizontal();
		GUILayout.Label("time: ");		
		GUILayout.Label(timer.timer.ToString());
		GUILayout.EndHorizontal();
		GUILayout.BeginHorizontal();
		GUILayout.Label("evacuated: ");		
		GUILayout.Label(evacuated.ToString());
		GUILayout.EndHorizontal();
		GUILayout.EndVertical();		
		GUILayout.EndArea();
		
}


function warning_exceeding_number(){

	GUI.Box (Rect (Screen.width/2 - 50, Screen.height/2-50, 120, 130),"Warning!");	    	// Make a group on the center of the screen
	GUILayout.BeginArea (Rect (Screen.width/2 - 50, Screen.height/2-30, 100, 100));
	GUILayout.BeginVertical();

	GUILayout.Label("You entered too large number. Please enter a smaller one!");
	
	// End the group we started above. This is very important to remember!
	GUILayout.EndVertical();
	GUILayout.EndArea();
}


//http://answers.unity3d.com/questions/50246/how-to-make-a-pause-function.html
function pause()
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




function define_behaviour(passenger_type_boarded : int, color : Color) {
	//var c = a;
	for (numLeft = passengers.length; numLeft > 0; numLeft--) {
		if (passenger_type_boarded == 0)
				break;
		var random=Random.Range(0,passengers.length);
		if(passengers[random].renderer.material.color==Color.white){
			passengers[random].renderer.material.color=color;
			passenger_type_boarded--;

		}
	}
	
}




function instantiate_aisle()
{
	
	for (y=minY;y<=maxY;y++)
	{
		a=Vector3(3 * spacing,0,y);
		b=Vector3(4 * spacing,0,y);
		occupied_seats.Add(a);
		occupied_seats.Add(b);
	
	
	}
} 


function instantiate_passengers()
{
	//initialise the aisle: people can't be seated in the aisle
	instantiate_aisle();
	
    // create an Object for each level
	var created_passengers = 0;
	print(behaviour_boarded+"total");
    while ( created_passengers < behaviour_boarded){
		print(created_passengers + "created");
    	// choose a random seat
        random_seat = seats[Random.Range(0,178)].transform.position;
        print(random_seat+"seat");
        var free = true;
            
        //check if the chosen seat is occupied
        for ( checkposition in occupied_seats){
          	if ( checkposition == random_seat) {
           		free = false;

            }

        }
            
        if (free == true){
           	//allocate the passenger to the particular seat
            passenger = Instantiate(passenger,random_seat, transform.rotation);
                
            //you can alter the positions of the passengers if these don't suit by changing the values at the end
            passenger.transform.position.y = passenger.transform.position.y+0.3;
            passenger.transform.position.x = passenger.transform.position.x+0.2;
        	passenger.transform.position.z = passenger.transform.position.z+0.1;
				
			//when we add the behaviour it will be given the respective behaviour rather than a color
        	passenger.renderer.material.color = Color.white;
           	passengers.Push(passenger);
            occupied_seats.Add(random_seat);
            created_passengers++;

        }
	}
	
	//instantiating the right behaviours to passengers
	/*define_behaviour(aggressive_boarded,Color.red);
	define_behaviour(children_boarded,Color.yellow);
	define_behaviour(women_boarded,Color.magenta);*/


}

