
//check which one is selected; assign behaviours to different textures
var isQuit=false;
var isStart=false;
var isOK=false;
var isCameraControls=false;
var isCameraMovement=false;
var isAbout=false;


//change the color to red when the mouse is on the option
function OnMouseEnter(){
	
	renderer.material.color=Color.red;

}


//change the color to white when the mouse is not on the option
function OnMouseExit(){
	
	renderer.material.color=Color.white;

}


//handle user choice
function OnMouseUp(){

	//if the user wants to quit the application
	if (isQuit==true) {
	
		Application.Quit();
		
	}
	
	//if the user wants to start a simulation
	else if(isStart==true){

		Application.LoadLevel("A320Scene (No Behaviour)");

	}
	
	//if the user wants to select OK- go to the main menu
	else if(isOK==true){
	
		Application.LoadLevel("Main Menu");

	}
	
	//if the user wants to see help with the camera switch keys
	else if(isCameraControls==true){
		
		Application.LoadLevel("Camera Controls");

	}
	
	//if the user wants to see help with the camera movement keys
	else if(isCameraMovement==true){
	
		Application.LoadLevel("Camera Movement");

	}
	
	//if the user wants to see the "About" section
	else if(isAbout==true){
		//load level
		Application.LoadLevel("About");

	}
}



//quit the application if escape key is pressed
function Update(){

	if (Input.GetKey(KeyCode.Escape)) {
    		Application.Quit();
	}
	
}