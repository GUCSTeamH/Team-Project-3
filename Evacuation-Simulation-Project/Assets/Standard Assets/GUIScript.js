import System.IO;
import System.Text;
import System;

//timer to measure evacuation time
var timer : Component;

//GUIStyle for customising the GUI
var style : GUIStyle;

//the plane capacity
var plane_capacity = 178;

//total number of passengers boarded
var behaviour_boarded = plane_capacity;

//altruism textfield start value
var altruism = "0";
//number of altruistic passengers boarded
var altruism_boarded = 0;

//behavioural inactive textfield start value
var behaviouralinaction = "0";
//number of behavioural inactive passengers boarded
var behaviouralinaction_boarded = 0;

//fearflight textfield start value
var fearflight = "0";
//number of fearflightpassengers boarded
var fearflight_boarded = 0;

//panic textfield start value 
var panic = "0";
//number of panic passengers boarded
var panic_boarded = 0;

//tells if the evacuation is started
var start =false;

//determines whether the user can still enter values in the textfields
var labels=false;

//tells if the application is paused
var isPaused=false;

//number of successfully evacuated passengers
var evacuated : int = 0;

//array of previously instantiated passengers
var passengers_active : GameObject [];

//GUISkin for customisation of the GUI
var guiSkin : GUISkin;

//the text appearing on the start button
var startButtonText = "Start";

//labels showing the user how many people evacuated through each door
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

//variables for customising the GUI elements' sizes
var buttonHeight = 50;
var buttonWidth = 100;
var textFieldWidth = 50;
var labelWidth = 100; 
var counterLabelWidth = 50;
var resultBoxWidth = 310;

//message reporting to the user when the results have been logged
var logText = "Results not logged yet.";


//tells if a warning appears on screen or not
var warning = false;

//tells if the user tried to disable all the doors
public var allDoorsDisabled = false;

//the names of the files where the results for analysis are stored
var evacuation_results_filename = "evacuation_results.txt";
var evacuation_doors_filename = "evacuation_doors_results.txt";

//array holding the activated passengers
var inactive_passengers = new Array();

//method to log results to files "evacuation_results.txt" and "evacuation_doors_results.txt" used for gathering data for analysis
function log_results(){

	//insert header to the files if they didn't exist
	if (!System.IO.File.Exists(Application.dataPath +"/"+evacuation_results_filename)){
	
	    File.AppendAllText(Application.dataPath +"/"+evacuation_results_filename,"total, altruism, behavioral inaction, fearflight, panic, total evacuation time"+ Environment.NewLine);
	
	}
	
	if (!System.IO.File.Exists(Application.dataPath +"/"+evacuation_doors_filename)){
	
	    File.AppendAllText(Application.dataPath +"/"+evacuation_doors_filename,"front left door, front right door, first middle left door, first middle right door, second middle left door, second middle right door, rear left door, rear right door"+ Environment.NewLine);
	
	}
	
	//insert data in the result files
	var evacuation_results : String = behaviour_boarded+", "+altruism_boarded +", "+behaviouralinaction_boarded +", "+fearflight_boarded +", "+panic_boarded +", "+timer.timer.ToString();
	File.AppendAllText(Application.dataPath +"/"+evacuation_results_filename,evacuation_results+ Environment.NewLine);
	
	var door_results : String = front_left_count+","+front_right_count+", "+first_middle_left_count+", "+first_middle_right_count+", "+second_middle_left_count+", "+second_middle_right_count+", "+rear_left_count+", "+rear_right_count;
	File.AppendAllText(Application.dataPath +"/"+evacuation_doors_filename,door_results+ Environment.NewLine);

}





//fuction to show the user the total number of passengers
function total_determinator(){

	GUILayout.BeginHorizontal();
	 
	if(labels == false){
	
	    //the total number of passengers is the sum of the different behaviours
    	behaviour_boarded = altruism_boarded + behaviouralinaction_boarded + fearflight_boarded + panic_boarded;
   		//if the total number of passengers is greater than the plane capacity show a warning to the user
   		if(behaviour_boarded > plane_capacity){
   		
   			warning_bad_number();
   			
   		}
    }
    //show what the total number of passengers is
    else {
    
    	GUILayout.Label (behaviour_boarded.ToString(),GUILayout.Width(textFieldWidth) );
        GUILayout.Label ("total",GUILayout.Width(labelWidth));
    
    }
    GUILayout.EndHorizontal();
}





//fuction to enable the user to choose the number of altruistic passengers through the GUI
function altruism_determinator(){

	style.normal.textColor = Color.green;
	GUILayout.BeginHorizontal(); 
	
    if(labels == false) {
    
    	//the text field for the user to enter a number
    	altruism = GUILayout.TextField (altruism,GUILayout.Width(textFieldWidth) );
    	//if the user entered anything
    	if(altruism != ""){
    	
    	    try{
    	        //parse the value the user entered
	    		altruism_boarded = parseInt(altruism);
	    		
	    		//check if the value is in an appropriate range
	    		if(altruism_boarded < 0 || altruism_boarded > behaviour_boarded - behaviouralinaction_boarded + fearflight_boarded + panic_boarded){ 
	    		                                    
		    		if(warning == false){
		    		
		    			warning_bad_number();
		    			warning = true;
		    		
		    		}
	    		}
    		}
    		//there were non-digits in the value
    		catch(err){
    		
    		    if(warning == false){
    		    
	    			warning_bad_number();
	    			warning = true;
	    		
	    		}
    			
			}
		}
		//assign a valid value if nothing entered
    	else {
    	
    		altruism_boarded = 0;
    		warning = false;
  		
  		}  
    }
    //show what the user entered
    else {
    
    	GUILayout.Label (altruism_boarded.ToString(),GUILayout.Width(textFieldWidth) );	
    
    }
    //label the value
    GUILayout.Label ("altruism",style,GUILayout.Width(labelWidth));
    GUILayout.EndHorizontal();		
}


//fuction to enable the user to choose the number of behavioural inactive passengers through the GUI
function behaviouralinaction_determinator(){

  	style.normal.textColor = Color.yellow;
	GUILayout.BeginHorizontal(); 
		
    if(labels==false) {
    
    	//the text field for the user to enter a number
    	behaviouralinaction = GUILayout.TextField (behaviouralinaction,GUILayout.Width(textFieldWidth) );
    	//if the user entered anything
    	if(behaviouralinaction != ""){
    	
    		try{
    			//parse the value the user entered
	    		behaviouralinaction_boarded = parseInt(behaviouralinaction);
	    		//check if the value is in an appropriate range
	    		if(behaviouralinaction_boarded < 0 || behaviouralinaction_boarded > behaviour_boarded - altruism_boarded + fearflight_boarded + panic_boarded){
	    		                                    
	    			if(warning == false){
	    			
		    			warning_bad_number();
		    			warning = true;
		    			
	    			}
	    		}
	    	}
	    	//there were non-digits in the value
	    	catch(err){
	    	
	    	    if(warning == false){
	    	    
	    			warning_bad_number();
	    			warning = true;
	    			
	    		}
			}
    	}
    	//assign a valid value if nothing entered
    	else {
    	
    		behaviouralinaction_boarded = 0;
    		warning = false;
    	
    	}
	}
	//show what the user entered
    else {	
    
    	GUILayout.Label (behaviouralinaction_boarded.ToString(),GUILayout.Width(textFieldWidth));
    
    }
    //label the value
    GUILayout.Label ("behaviour inactive",style,GUILayout.Width(labelWidth));
    GUILayout.EndHorizontal();		
}
    	

//fuction to enable the user to choose the number of fearflight passengers through the GUI
function fearflight_determinator(){

	style.normal.textColor = Color.cyan;
	GUILayout.BeginHorizontal(); 		

    if (labels==false) {
    
    	//the text field for the user to enter a number
    	fearflight = GUILayout.TextField (fearflight,GUILayout.Width(textFieldWidth) );
    	
    	//if the user entered anything
    	if(fearflight!=""){
    	
  			try{
  				//parse the value the user entered
	    		fearflight_boarded=parseInt(fearflight);
	    		//check if the value is in an appropriate range
	    		if(fearflight_boarded < 0 || fearflight_boarded > behaviour_boarded - altruism_boarded + behaviouralinaction_boarded + panic_boarded){
	    		                                           
	    			if(warning == false){
	    			
		    			warning_bad_number();
		    			warning = true;
		    			
	    			}
	    		}
	    	}
	    	//there were non-digits in the value
	        catch(err){
	            if(warning == false){
	            
	    			warning_bad_number();
	    			warning = true;
	    			
	    		}
			}
    	}
    	//assign a valid value if nothing entered
    	else {
    	
    		fearflight_boarded=0;
    		warning = false;
    		
    	}
    }
      //show what the user entered
    else {
    
    	GUILayout.Label (fearflight_boarded.ToString(),GUILayout.Width(textFieldWidth) );
    
    }	
    //label the value
    GUILayout.Label ("fearflight",style,GUILayout.Width(labelWidth));
    GUILayout.EndHorizontal();		
        
    
}


//fuction to enable the user to choose the number of panic passengers through the GUI
function panic_determinator(){

	style.normal.textColor = Color.red;
	GUILayout.BeginHorizontal(); 		

    if (labels==false) {
    
    	//the text field for the user to enter a number	
    	panic = GUILayout.TextField (panic,GUILayout.Width(textFieldWidth) );
    	//if the user entered anything
    	if(panic!=""){
  			try{
  				//parse the value the user entered
	    		panic_boarded=parseInt(panic);
	    		//check if the value is in an appropriate range
	    		if(panic_boarded < 0 || panic_boarded > behaviour_boarded - altruism_boarded + behaviouralinaction_boarded + fearflight_boarded){     
	    		                                           
	    			if(warning == false){
	    			
		    			warning_bad_number();
		    			warning = true;
		    			
	    			}
	    		}
	    	}
	    	//there were non-digits in the value
	        catch(err){
	        
	            if(warning == false){
	            
	    			warning_bad_number();
	    			warning = true;
	    			
	    		}
			}
    	}
    	//assign a valid value if nothing entered
    	else {
    	
    		panic_boarded=0;
    		warning = false;
    		
    	}
    }
    
    //show what the user entered
    else {
    
    	GUILayout.Label (panic_boarded.ToString(),GUILayout.Width(textFieldWidth) );
    
    }
    //label the value	
    GUILayout.Label ("panic",style,GUILayout.Width(labelWidth));
    GUILayout.EndHorizontal();		
            
}


//generates random index for a passenger to be activated
function generate_random_passenger() : int {

	// choose a random number
    var random_num = UnityEngine.Random.Range(0,inactive_passengers.length);
    //get the random passenger 
    var random_pass = inactive_passengers[random_num];
    //remove it from the array of inactive passengers so that it doesn't choose it again
    inactive_passengers.splice(random_num,1);
    return random_pass;
    
}

function Start(){

populate_inactive_passengers_array();

}


//function for initialising the GUI
function OnGUI(){
	//customise the look
	GUI.skin = guiSkin;
	
	//do not show a warning message at the beginning 
	warning = false;
	
	//GUI area
    GUILayout.BeginArea (Rect (10,0,Screen.width-10, Screen.height));        
    GUILayout.BeginVertical();
	
	//enabling the user to choose the numbers of different passengers 

	altruism_determinator();
	behaviouralinaction_determinator();
	fearflight_determinator();
	panic_determinator();
	total_determinator();
    
    //buttons and pre-comdition initialisation
    
    //deactivate the passengers until the user presses start
	if(start == false){
		for (var passenger : GameObject in passengers_active){
			passenger.active = false;
		}
	}
		
	var startButton = GUILayout.Button(startButtonText,GUILayout.Height(buttonHeight),GUILayout.Width(buttonWidth));
   
    //start the animation
    if (startButton && start == false && warning == false){
    
    	
		timer.start_timer();
		var passengers_created : int  = 0;
		var openDoor = GameObject.FindGameObjectWithTag("plane").GetComponent("openDoors").onStart();
			
		start=true;
		labels=true;
		var passenger: GameObject;

		var altr_count : int = 0;
		var panic_count : int = 0;
		var behav_count : int = 0;
		var fear_count : int  = 0;
		
		//activate the required number of passengers having the required behaviour
		while (passengers_created < behaviour_boarded && passengers_created < plane_capacity){
			
			//choose a random passenger to activate
			var random_passenger = generate_random_passenger();
			passenger = passengers_active[random_passenger];
			
			
			//determine the passenger's behaviour
			if (altr_count < altruism_boarded) {
			
				passenger.active = true;
				passenger.GetComponent("closestDoor").calculateDoor();
				passenger.GetComponent("Attribute").SetTypeManual("altruism");
				passenger.GetComponent("Attribute").StartBehManual();
				altr_count++;

				
			}
			else if (panic_count < panic_boarded) {
			
				passenger.active = true;	
				passenger.GetComponent("closestDoor").calculateDoor();
				passenger.GetComponent("Attribute").SetTypeManual("panic");
				passenger.GetComponent("Attribute").StartBehManual();
				panic_count++;
				
			}
			else if (behav_count < behaviouralinaction_boarded) {
			
				passenger.active = true;	
				passenger.GetComponent("closestDoor").calculateDoor();
				passenger.GetComponent("Attribute").SetTypeManual("behaviouralinaction");
				passenger.GetComponent("Attribute").StartBehManual();
				behav_count++;
				
			}
			else if (fear_count < fearflight_boarded) {
			
				passenger.active = true;
				passenger.GetComponent("closestDoor").calculateDoor();
				passenger.GetComponent("Attribute").SetTypeManual("fearflight");
				passenger.GetComponent("Attribute").StartBehManual();
				fear_count++;
				
			}
			
			passengers_created++;

		}

		startButtonText="Restart";
	}
	else if (startButton && start == true){
	
        Application.LoadLevel(Application.loadedLevel);
    }
		  
    //button for pausing the animation
	if (GUILayout.Button("Pause",GUILayout.Height(buttonHeight),GUILayout.Width(buttonWidth))){
    
    	pause();               
                
    }  
    //button for the main menu
	if (GUILayout.Button("Main Menu",GUILayout.Height(buttonHeight),GUILayout.Width(buttonWidth))){
    
    	Application.LoadLevel("Main Menu");
                
    }
    
  	GUILayout.EndVertical();      
    initialise_results_box();
    GUILayout.EndArea();  
    
    //check if the evacuation in finished to report to the user  
    if (start == true && (evacuated == behaviour_boarded || timer.timer == 90)){
    
		evacuation_done();
		
	}		
	if(allDoorsDisabled){
	
		warning_doors();
		
	}
    	
}	

//update the number of evacuated passengers when a passenger evacuates successfully
public function updateEvac(){

	evacuated++;	

}


//GUI for the results box
function initialise_results_box(){
	
	GUILayout.BeginArea (Rect (Screen.width - resultBoxWidth, 0, resultBoxWidth, Screen.height));
	GUILayout.BeginVertical();
	GUILayout.BeginHorizontal();
	GUILayout.Label("time: ",GUILayout.Width(labelWidth));		
	GUILayout.Label(timer.timer.ToString(),GUILayout.Width(counterLabelWidth));
	GUILayout.Label("evacuated: ",GUILayout.Width(labelWidth));		
	GUILayout.Label(evacuated.ToString(),GUILayout.Width(counterLabelWidth));
	GUILayout.EndHorizontal();
	GUILayout.BeginHorizontal();
	GUILayout.Label("Front left: ",GUILayout.Width(labelWidth));		
	GUILayout.Label(front_left_count.ToString(),GUILayout.Width(counterLabelWidth));
	GUILayout.Label("Front right: ",GUILayout.Width(labelWidth));		
	GUILayout.Label(front_right_count.ToString(),GUILayout.Width(counterLabelWidth));
	GUILayout.EndHorizontal();
	GUILayout.BeginHorizontal();
	GUILayout.Label("Middle left 1: ",GUILayout.Width(labelWidth));		
	GUILayout.Label(first_middle_left_count.ToString(),GUILayout.Width(counterLabelWidth));
	GUILayout.Label("Middle right 1: ",GUILayout.Width(labelWidth));		
	GUILayout.Label(first_middle_right_count.ToString(),GUILayout.Width(counterLabelWidth));
	GUILayout.EndHorizontal();
	GUILayout.BeginHorizontal();
	GUILayout.Label("Middle left 2: ",GUILayout.Width(labelWidth));		
	GUILayout.Label(second_middle_left_count.ToString(),GUILayout.Width(counterLabelWidth));
	GUILayout.Label("Middle right 2: ",GUILayout.Width(labelWidth));		
	GUILayout.Label(second_middle_right_count.ToString(),GUILayout.Width(counterLabelWidth));
	GUILayout.EndHorizontal();
	GUILayout.BeginHorizontal();
	GUILayout.Label("Rear left: ",GUILayout.Width(labelWidth));		
	GUILayout.Label(rear_left_count.ToString(),GUILayout.Width(counterLabelWidth));
	GUILayout.Label("Rear right: ",GUILayout.Width(labelWidth));		
	GUILayout.Label(rear_right_count.ToString(),GUILayout.Width(counterLabelWidth));
	GUILayout.EndHorizontal();

	
	if (GUILayout.Button("Log results",GUILayout.Width(buttonWidth),GUILayout.Height(buttonHeight))){
		
		log_results();
		logText = "Results logged at "+timer.timer +" seconds. They are stored in "+evacuation_results_filename + " and " + evacuation_doors_filename;
	
	}
	
	GUILayout.Label(logText);
	GUILayout.EndVertical();
	GUILayout.EndArea();

}


//warning that the user entered an unvalid number
function warning_bad_number(){

	GUI.Box (Rect (Screen.width/2 - 100, Screen.height/2-100, 200, 160),"Warning!");
    GUILayout.BeginArea (Rect (Screen.width/2 - 100, Screen.height/2-70, 200, 130));
    GUILayout.BeginVertical();

    GUILayout.Label("You entered an unappropriate number. Please make sure you enter non-negative digits and the numbers sum up to 178 at most!");
        
    GUILayout.EndVertical();
    GUILayout.EndArea();
}


//information message to tell the user they cannot disable all the doors when they try to
function warning_doors(){

	GUI.Box (Rect (Screen.width/2 - 100, Screen.height/2-100, 100, 125),"Warning!");          
    GUILayout.BeginArea (Rect (Screen.width/2 - 100, Screen.height/2-70, 100, 100));
    GUILayout.BeginVertical();
    
    GUILayout.Label("You cannot disable all the doors!");
    if(GUILayout.Button("OK")){
    
       	allDoorsDisabled = false;
       	
    }
       
    GUILayout.EndVertical();
    GUILayout.EndArea();
}



//reports to the user that the evacuation is finished
function evacuation_done(){

	//stop the timer
    Time.timeScale = 0;
    //show a message
    GUI.Box (Rect (Screen.width/2 - 75, Screen.height/2-50, 145, 155),"Finish!"); 
    GUILayout.BeginArea (Rect (Screen.width/2 - 75, Screen.height/2-30, 145, 150));
    GUILayout.BeginVertical();

    GUILayout.Label("This is the end of this simulation. A total of "+evacuated+" evacuated for "+timer.timer.ToString()+" seconds. "+ (behaviour_boarded - evacuated) +" couldn't evacuate.");
    if(GUILayout.Button("OK")){
    
    	log_results();
        Application.LoadLevel(Application.loadedLevel);
    
    }
  
    GUILayout.EndVertical();
    GUILayout.EndArea();
}



//pause the application
function pause(){

	if (isPaused == true){
	
		Time.timeScale = 1;
		isPaused = false;
		
	}
	
	else{
	
		Time.timeScale = 0;
		isPaused = true;
		
	}
}

//populates the array of inactive passenger indexes
function populate_inactive_passengers_array(){

	for(var i=0;i<plane_capacity;i++){
	
		inactive_passengers[i] = i;
		
	}
	
}






//functions that update the counters depending on which door a passenger uses
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





