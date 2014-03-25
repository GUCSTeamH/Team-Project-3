//http://answers.unity3d.com/questions/273094/unity3d-timer-request.html

//the value of the timer
var timer : float = 0.0;  


//start the timer
function start_timer(){

	InvokeRepeating("update_timer", 1,1);

}


//update the timer every second
function update_timer(){

	GUI.Label(Rect(110, 10, 140, 20), timer.ToString());
	timer += 1;
 
}