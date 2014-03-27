//variables for the different cameras
var frontCamera: Camera;
var backCamera : Camera;
var leftCamera: Camera;
var rightCamera : Camera;
var topCamera: Camera;
var movingCamera: Camera;
var currentCamera: Camera;


//the moving vector position for the camera
var movingCamPos : Vector3;

 
//set the current camera to the moving camera for more flexibility at the start, disable all the rest
function Start()

{

  currentCamera = movingCamera;
  currentCamera.enabled = true;
  frontCamera.enabled = false;
  backCamera.enabled = false;
  topCamera.enabled = false;
  leftCamera.enabled = false;
  rightCamera.enabled = false;
  movingCamPos = transform.position;
  
}


//handling camera switching
function Update () {

	//switch to front camera, disable all the rest
    if(Input.GetKeyDown("1")){
	
	    frontCamera.enabled = true;
	    backCamera.enabled = false;
	    topCamera.enabled = false;
	    leftCamera.enabled = false;
	    rightCamera.enabled = false;
	    movingCamera.enabled = false;
	    currentCamera = frontCamera;
		
    }
	
	//switch to back camera, disable all the rest
    if(Input.GetKeyDown("2")){
	
	    frontCamera.enabled = false;
	    backCamera.enabled = true;
	    topCamera.enabled = false;
	    leftCamera.enabled = false;
	    rightCamera.enabled = false;
	    movingCamera.enabled = false;
	    currentCamera = backCamera;
		
    }
	
	//switch to top camera, disable all the rest
    if(Input.GetKeyDown("3")){
	
	    frontCamera.enabled = false;
	    backCamera.enabled = false;
	    topCamera.enabled = true;
	    leftCamera.enabled = false;
	    rightCamera.enabled = false;
	    movingCamera.enabled = false;
	    currentCamera = topCamera;
		
    }
	
	//switch to left camera, disable all the rest
    if(Input.GetKeyDown("4")){
	
	    frontCamera.enabled = false;
	    backCamera.enabled = false;
	    topCamera.enabled = false;
	    leftCamera.enabled = true;
	    rightCamera.enabled = false;
	    movingCamera.enabled = false;
	    currentCamera = leftCamera;
		
	}
	
	//switch to right camera, disable all the rest
    if(Input.GetKeyDown("5")){
	    frontCamera.enabled = false;
	    backCamera.enabled = false;
	    topCamera.enabled = false;
	    leftCamera.enabled = false;
	    rightCamera.enabled = true;
	   	movingCamera.enabled = false;
	   	currentCamera = rightCamera;

    }
	
	//switch to moving camera, disable all the rest
    if(Input.GetKeyDown("6")){
	
	    frontCamera.enabled = false;
	    backCamera.enabled = false;
	    topCamera.enabled = false;
	    leftCamera.enabled = false;
	    rightCamera.enabled = false;
	    movingCamera.enabled = true;
	   	currentCamera = movingCamera;
		

    }
    
	
	//define movement keys for cameras
    if (Input.GetKey(KeyCode.UpArrow)) currentCamera.transform.Translate(Vector3.forward * Time.deltaTime * 10);

	if (Input.GetKey(KeyCode.DownArrow)) currentCamera.transform.Translate(Vector3.back * Time.deltaTime * 10);

	if (Input.GetKey(KeyCode.LeftArrow)) currentCamera.transform.Translate(Vector3.left * Time.deltaTime * 10);

	if (Input.GetKey(KeyCode.RightArrow)) currentCamera.transform.Translate(Vector3.right * Time.deltaTime * 10);

}
