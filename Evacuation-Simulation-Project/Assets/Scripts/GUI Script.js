var plane_capacity = 178;			// Plane maximum capacity set to 178 
var passenger : GameObject;			// Passengers of type GameObject
var door: GameObject[];				// List of doors of type GameObject
var occupied_seats = new Array();	// Array that contains used up positions

var timer : Timer;

var spacing = 2.0;

public var passengers= new Array();

//new
public var doors :Vector3[];

var total  = "100";					// Set default total to 100
var total_boarded : int;			// Total amount borded is of type integer

var start = false;

var labels = false;

var isPaused = false;


var seats : GameObject [];


var minY: int = 0;  
var maxY: int = 25;

var women_boarded : int;
var children_boarded : int;
var aggressive_boarded : int;

function total_determinator(){
		GUI.Label (Rect (30, 0, 100, 30), "total");
		if(labels == false){
    		total = GUILayout.TextField (total, 25);
    		if(total != ""){
    			total_boarded = parseInt(total);
    			if (total_boarded > 178){ // user entered more than the capacity of the plane
    				warning_exceeding_number();
    				//total_boarded = 178;
    			}
    		}
    		else                          //should prompt the user to enter something
    			total_boarded = 100;        //should be changed - mock up for now
    		
    	}
    	else {
    	     GUILayout.Label (total_boarded.ToString());
    	}
}


function aggressive_determinator(){
	GUI.Label (Rect (30, 25, 100, 30), "aggressive");
	/*
    if(labels == false) {
    	aggressive = GUILayout.TextField (aggressive, 50);
    	if(aggressive != ""){
    		aggressive_boarded = parseInt(aggressive);
    		if(aggressive_boarded > total_boarded)     //if user entered a greater value than the total passengers
    		                                    //all the passengers are aggressive
    			warning_exceeding_number();
    		
    	}
    	else 
    		aggressive_boarded = 0;     //change to ask the user to enter a value
    }
    else {
    	GUILayout.Label (aggressive_boarded.ToString());	
    }
    */
    aggressive_boarded = 0;
}

function children_determinator(){
	GUI.Label (Rect (30, 50, 100, 30), "children");
    /*
    if(labels==false) {
    	children = GUILayout.TextField (children, 75);
    	
    	if(children != ""){
    		children_boarded = parseInt(children);
    		
    		if(children_boarded > total_boarded)     	//if user entered a greater value than the total passengers
    			warning_exceeding_number();				//all the passengers are aggressive
    	}
    	else 
    		children_boarded = 0;
    }
    else {	
    	GUILayout.Label (children_boarded.ToString());
    }
    */
    children_boarded = 0;
}
    	
function women_determinator(){
    GUI.Label (Rect (30, 75, 100, 30), "women");
    /*
    if (labels==false) {	
    	women = GUILayout.TextField (women, 100);
    	
    	if(women!=""){
    		women_boarded=parseInt(women);
    		if(women_boarded > total_boarded)    	//if user entered a greater value than the total passengers
    			warning_exceeding_number();			// all the passengers are aggressive
    	}
    	
    	else 
    		women_boarded = 0;
    }
    else {
    	GUILayout.Label (women_boarded.ToString());
    }	
    */
    women_boarded = 0;
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
    			// check if greater than a specific number...
    			else 
    				variable = 0;
    	}
    	else{
    		GUILayout.Label (variable.ToString());
    	}
}		

function initialise_results_box(){
		GUI.Box (Rect (Screen.width - 110, 10, 100, 100), "Results");	
		GUILayout.BeginArea (Rect (Screen.width - 110, 30, 100, 80));
		GUILayout.BeginVertical();
		GUILayout.BeginHorizontal();
		GUILayout.Label("time: ");		
		//GUILayout.Label(timer.timer.ToString());
		GUILayout.EndHorizontal();
		GUILayout.BeginHorizontal();
		GUILayout.Label("evacuated: ");		
		GUILayout.Label("0");
		GUILayout.EndHorizontal();
		GUILayout.EndVertical();		
		GUILayout.EndArea();
}


function warning_exceeding_number(){
	// Make a group on the centre of the screen
	GUI.Box (Rect (Screen.width/2 - 50, Screen.height/2-50, 120, 130),"Warning!");
	GUILayout.BeginArea (Rect (Screen.width/2 - 50, Screen.height/2-30, 100, 100));
	GUILayout.BeginVertical();
	GUILayout.Label("Maximum capacity is 178 passengers. Please enter a smaller number!");
	
	// End the group we started above. This is very important to remember!
	GUILayout.EndVertical();
	GUILayout.EndArea();
}

//http://answers.unity3d.com/questions/50246/how-to-make-a-pause-function.html
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

function define_behaviour(passenger_type_boarded : int, color : Color, s : String) {
	//var c = a;
	for (numLeft = passengers.length; numLeft > 0; numLeft--) {
		if (passenger_type_boarded == 0)
				break;
		var random=Random.Range(0,passengers.length);
		if(passengers[random].renderer.material.color==Color.white){
			passengers[random].GetComponent("test_prefabScript").setColor(color, s);
			passengers[random].GetComponent("test_prefabScript").setColor(Color.red, "red");
			passenger_type_boarded--;
		}
	}
}

function instantiate_aisle(){
	for (y = minY; y <= maxY; y++){
		a = Vector3(3 * spacing,0,y);
		b = Vector3(4 * spacing,0,y);
		occupied_seats.Add(a);
		occupied_seats.Add(b);
	}
} 

function instantiate_passengers(){
	//initialise the aisle: people can't be seated in the aisle
	instantiate_aisle();

	//get positions of all doors
	//door=GameObject.FindGameObjectsWithTag("door");
	
    // create an object for each level
	var created_passengers = 0;
	print(total_boarded + "total");
    while (created_passengers < total_boarded){
		print(created_passengers + "created");
    	// choose a random seat
        random_seat = seats[Random.Range(0,118)].transform.position;
        print(random_seat+"seat");
        var free = true;
            
        //check if the chosen seat is occupied
        for (checkposition in occupied_seats){
          	if (checkposition == random_seat) {
           		free = false;
            }
        }
            
        if (free == true){
           	//allocate the passenger to the particular seat
            passenger = Instantiate(passenger,random_seat, transform.rotation);
                
            //you can alter the positions of the passengers if these don't suit by changing the values at the end
            passenger.transform.position.y = passenger.transform.position.y+1.7;
            passenger.transform.position.x = passenger.transform.position.x+1;
        	passenger.transform.position.z = passenger.transform.position.z+0.1;
       	
			//when we add the behaviour it will be given the respective behaviour rather than a color
        	passenger.GetComponent("test_prefabScript").setColor(Color.white, "white");
        	passenger.GetComponent("test_prefabScript").setClosest();
        	
           	passengers.Push(passenger);
            occupied_seats.Add(random_seat);
            created_passengers++;       
        }
	}
	
	//instantiating the right behaviours to passengers
	define_behaviour(aggressive_boarded, Color.red, "red");
	define_behaviour(children_boarded, Color.yellow, "yellow");
	define_behaviour(women_boarded, Color.magenta, "magenta");
}

function OnGUI(){
	total_determinator();
	aggressive_determinator();
	children_determinator();
	women_determinator();
	initialise_results_box();
	//determinator(120,34,56,75,"women",women,women_boarded);
	
    // starting the animation
	if(start == false){
    	if (GUI.Button(Rect(0,100,100,40),"Start")){
			timer.start_timer();
			instantiate_passengers();
			start=true;
			labels=true;
		}
	}
	
	// quitting the animation
	if (GUI.Button(Rect(0,200,100,40),"Quit")){
		Application.Quit();
	}
	
	// pausing the animation
	if (GUI.Button(Rect(0,150,100,40),"Pause")){		
		pause();;
	}	
	
	// restarting the animation
	if (GUI.Button(Rect(0,250,100,40),"Restart")){
		Application.LoadLevel("scene3");
	}
}	

