import System.IO;
import System.Text;
import System;

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

var guiSkin : GUISkin;

var startButtonText = "Start";


var front_left_count = 0;
var front_left = "Front left door";

var front_right_count = 0;
var front_right = "Front left door";

var first_middle_left_count = 0;
var first_middle_left = "First middle left door";

var second_middle_left_count = 0;
var second_middle_left = "Second middle left door";

var first_middle_right_count = 0;
var first_middle_right = "First middle right door";

var second_middle_right_count = 0;
var second_middle_right = "Second middle right door";

var rear_left_count = 0;
var rear_left = "Rear left door";

var rear_right_count = 0;
var rear_right = "Rear right door";

function log_results(){
        var results : String = behaviour_boarded+","+altruism+","+timer.timer.ToString();
        File.AppendAllText(Application.dataPath +"/results.txt",results+ Environment.NewLine);
}

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
    		//Debug.Log ("total = " + total);
    		if(total != ""){
    			behaviour_boarded = parseInt(total);
    			if (behaviour_boarded > 178){ //user entered more than the capacity of the plane
    				warning_exceeding_number("total");
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
	GUILayout.BeginHorizontal(); 
    if(labels == false) {
    	altruism = GUILayout.TextField (altruism, GUILayout.Width(50));
    
    	if(altruism != ""){
    		altruism_boarded = parseInt(altruism);
    		if(altruism_boarded > behaviour_boarded)     //if user entered a greater value than the total passengers
    			warning_exceeding_number("total");
    	}
    	else 
    		altruism_boarded = 0;     //change to ask the user to enter a value
    		behaviour_boarded -= altruism_boarded;
    }
    else {
    	GUILayout.Label (altruism_boarded.ToString(),GUILayout.Width(50));	
    }
    GUILayout.Label ("altruism",style);
    GUILayout.EndHorizontal();
}

function behaviouralinaction_determinator(){
	style.normal.textColor = Color.yellow;
	GUILayout.BeginHorizontal(); 
    if(labels == false) {
    	behaviouralinaction = GUILayout.TextField (behaviouralinaction, GUILayout.Width(50));
    	if(behaviouralinaction != ""){
    		behaviouralinaction_boarded = parseInt(behaviouralinaction);
    		if(behaviouralinaction_boarded > behaviour_boarded)     //if user entered a greater value than the total passengers
    			warning_exceeding_number("total");
    	}
    	else 
    		behaviouralinaction_boarded = 0;     //change to ask the user to enter a value
    		behaviour_boarded -= behaviouralinaction_boarded;
    }
    else {
    	GUILayout.Label (behaviouralinaction_boarded.ToString(),GUILayout.Width(50));	
    }
    GUILayout.Label ("behaviour inactive",style);
    GUILayout.EndHorizontal(); 
}

function fearflight_determinator(){
	style.normal.textColor = Color.black;
	GUILayout.BeginHorizontal();  
    if(labels == false) {
    	fearflight = GUILayout.TextField (fearflight, GUILayout.Width(50));
    	if(fearflight != ""){
    		fearflight_boarded = parseInt(fearflight);
    		if(fearflight_boarded > behaviour_boarded)     //if user entered a greater value than the total passengers
    			warning_exceeding_number("total");
    	}
    	else 
    		fearflight_boarded = 0;     //change to ask the user to enter a value
    		behaviour_boarded -= fearflight_boarded;
    }
    else {
    	GUILayout.Label (fearflight_boarded.ToString(),GUILayout.Width(50));
    }   
        GUILayout.Label ("fearflight",style);
        GUILayout.EndHorizontal();  
}

function panic_determinator(){
	style.normal.textColor = Color.red;
	GUILayout.BeginHorizontal();
    if(labels == false) {
    	panic = GUILayout.TextField (panic, GUILayout.Width(50));
    	if(panic != ""){
    		panic_boarded = parseInt(panic);
    		if(panic_boarded > behaviour_boarded)     //if user entered a greater value than the total passengers
    			warning_exceeding_number("total");
    	}
    	else 
    		panic_boarded = 0;     //change to ask the user to enter a value
    		behaviour_boarded -= panic_boarded;
    }
    else {
    	 GUILayout.Label (panic_boarded.ToString(),GUILayout.Width(50));
    }   
        GUILayout.Label ("panic",style);
        GUILayout.EndHorizontal();
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
	    		
    GUILayout.BeginHorizontal();
    if (labels==false) {	
    	women = GUILayout.TextField (women, GUILayout.Width(50));
    	if(women!=""){
    	
    		women_boarded=parseInt(women);
    		if(women_boarded > behaviour_boarded)     //if user entered a greater value than the total passengers
    			warning_exceeding_number("total");
    		
    	}
    	else 
    		women_boarded=0;
    }
    else {
    	GUILayout.Label (women_boarded.ToString(),GUILayout.Width(50));
    }   
        GUILayout.Label ("women",style);
        GUILayout.EndHorizontal();
    
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
	GUI.skin = guiSkin;

    GUILayout.BeginArea (Rect (0,0,Screen.width, Screen.height));
    GUILayout.BeginHorizontal();
        
    GUILayout.BeginVertical();
	
	total_determinator();
	altruism_determinator();
	behaviouralinaction_determinator();
	fearflight_determinator();
	panic_determinator();
	/*overfifty_determinator();*/
	/*children_determinator();*/
	/*women_determinator();*/
	
	GUILayout.EndVertical();
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
		}
		
    	var startButton = GUILayout.Button(startButtonText,GUILayout.Height(50),GUILayout.Width(100));
        if (startButton && start == false){
			timer.start_timer();
			//instantiate_passengers();
			//initialise_results_box();
			
			var openDoor = GameObject.FindGameObjectWithTag("plane").GetComponent("openDoors").onStart();
			
			start=true;
			labels=true;
			if (altruism_boarded == 0 && panic_boarded == 0 && behaviouralinaction_boarded == 0 && fearflight_boarded == 0 ) {
				for (var passenger : GameObject in passengers_active) {
					passenger.active = true;
					passenger.GetComponent("closestDoor").calculateDoor();
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
						passenger.GetComponent("closestDoor").calculateDoor();
						passenger.GetComponent("Attribute").SetTypeManual("altruism");
						passenger.GetComponent("Attribute").StartBehManual();
						altr_count++;
						continue;
					} else if (panic_count < panic_boarded) {
						passenger.active = true;	
						//passenger.GetComponent("closestDoor").calculateDoor();
						passenger.GetComponent("Attribute").SetTypeManual("panic");
						passenger.GetComponent("Attribute").StartBehManual();
						panic_count++;
						continue;
					} else if (behav_count < behaviouralinaction_boarded) {
						passenger.active = true;	
						passenger.GetComponent("closestDoor").calculateDoor();
						passenger.GetComponent("Attribute").SetTypeManual("behaviouralinaction");
						passenger.GetComponent("Attribute").StartBehManual();
						behav_count++;
						continue;
					} else if (fear_count < fearflight_boarded) {
						passenger.active = true;
						passenger.GetComponent("closestDoor").calculateDoor();
						passenger.GetComponent("Attribute").SetTypeManual("fearflight");
						passenger.GetComponent("Attribute").StartBehManual();
						fear_count++;
						continue;
					}
				}
				
			}
			startButtonText="Restart";
		}
		else if (startButton && start == true){
                Application.LoadLevel("A320Scene (No Behaviour)");
        }
		
	//quitting the animation
        if (GUILayout.Button("Main Menu",GUILayout.Height(50),GUILayout.Width(100))){
                Application.LoadLevel("Main Menu");
                
        }
        
          //pausing the animation
        if (GUILayout.Button("Pause",GUILayout.Height(50),GUILayout.Width(100))){
                pause();
                
                
        }  
        
        initialise_results_box();
		GUILayout.EndHorizontal();
        GUILayout.EndArea();  
        
        if ((evacuated == plane_capacity) || (timer.timer == 90)){
			evacuation_done();
		}		
    	
	}	

public function updateEvac(){
	evacuated++;
	
}

function initialise_results_box(){

                GUILayout.BeginArea (Rect (Screen.width - 300, 10, 300, Screen.height-100));
                GUILayout.BeginVertical();
                GUILayout.BeginHorizontal();
                GUILayout.Label("time: ",GUILayout.Width(100));         
                GUILayout.Label(timer.timer.ToString(),GUILayout.Width(50));
                GUILayout.EndHorizontal();
                GUILayout.BeginHorizontal();
                GUILayout.Label("evacuated: ",GUILayout.Width(100));            
                GUILayout.Label(evacuated.ToString(),GUILayout.Width(50));
                GUILayout.EndHorizontal();
                GUILayout.BeginHorizontal();
                GUILayout.Label("Front left: ",GUILayout.Width(100));           
                GUILayout.Label(front_left_count.ToString(),GUILayout.Width(50));
                GUILayout.Label("Front right: ",GUILayout.Width(100));          
                GUILayout.Label(front_right_count.ToString(),GUILayout.Width(50));
                GUILayout.EndHorizontal();
                GUILayout.BeginHorizontal();
                GUILayout.Label("Middle left 1: ",GUILayout.Width(100));                
                GUILayout.Label(first_middle_left_count.ToString(),GUILayout.Width(50));
                GUILayout.Label("Middle right 1: ",GUILayout.Width(100));               
                GUILayout.Label(first_middle_right_count.ToString(),GUILayout.Width(50));
                GUILayout.EndHorizontal();
                GUILayout.BeginHorizontal();
                GUILayout.Label("Middle left 2: ",GUILayout.Width(100));                
                GUILayout.Label(second_middle_left_count.ToString(),GUILayout.Width(50));
                GUILayout.Label("Middle right 2: ",GUILayout.Width(100));               
                GUILayout.Label(second_middle_right_count.ToString(),GUILayout.Width(50));
                GUILayout.EndHorizontal();
                GUILayout.BeginHorizontal();
                GUILayout.Label("Rear left: ",GUILayout.Width(100));            
                GUILayout.Label(rear_left_count.ToString(),GUILayout.Width(50));
                GUILayout.Label("Rear right: ",GUILayout.Width(100));           
                GUILayout.Label(rear_right_count.ToString(),GUILayout.Width(50));
                GUILayout.EndHorizontal();
                if (GUILayout.Button("Log results",GUILayout.Width(100),GUILayout.Height(50))){
                        log_results();  
                }       

                
                GUILayout.EndArea();               
}



function warning_exceeding_number(variable:String){

        GUI.Box (Rect (Screen.width/2 - 50, Screen.height/2-50, 120, 160),"Warning!");          // Make a group on the center of the screen
        GUILayout.BeginArea (Rect (Screen.width/2 - 50, Screen.height/2-30, 100, 160));
        GUILayout.BeginVertical();

        GUILayout.Label("You entered too large number for "+variable+" passengers. Please enter a smaller one!");
        
        // End the group we started above. This is very important to remember!
        GUILayout.EndVertical();
        GUILayout.EndArea();
}


function evacuation_done(){
        Time.timeScale = 0;

        GUI.Box (Rect (Screen.width/2 - 50, Screen.height/2-50, 120, 160),"Finish!");           // Make a group on the center of the screen
        GUILayout.BeginArea (Rect (Screen.width/2 - 50, Screen.height/2-30, 120, 140));
        GUILayout.BeginVertical();

        GUILayout.Label("This is the end of this simulation. A total of "+behaviour_boarded+" evacuated for "+timer.timer.ToString()+" seconds.");
        if(GUILayout.Button("OK")){
                log_results();
                Application.LoadLevel("Main Menu");

        }
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
		var random=UnityEngine.Random.Range(0,passengers.length);
		if(passengers[random].renderer.material.color==Color.white){
			passengers[random].renderer.material.color=color;
			passenger_type_boarded--;

		}
	}
	
}

public function updateEvacFL(){
	front_left_count++;
	updateEvac();
}

public function updateEvacFR(){
	front_right_count++;
	updateEvac();
}

public function updateEvacBR(){
	rear_right_count++;
	updateEvac();
}

public function updateEvacBL(){
	rear_left_count++;
	updateEvac();
}

public function updateEvacML1(){
	first_middle_left_count++;
	updateEvac();
}

public function updateEvacML2(){
	second_middle_left_count++;
	updateEvac();
}

public function updateEvacMR1(){
	first_middle_right_count++;
	updateEvac();
}

public function updateEvacMR2(){
	second_middle_right_count++;
	updateEvac();
}


