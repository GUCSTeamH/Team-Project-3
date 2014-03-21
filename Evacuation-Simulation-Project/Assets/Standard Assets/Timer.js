//http://answers.unity3d.com/questions/273094/unity3d-timer-request.html


var timer : float = 0.0;  



function start_timer()
{
//timer=0;

	InvokeRepeating("update_timer", 1,1);

}

function update_timer()
{

	GUI.Label(Rect(110, 10, 140, 20), timer.ToString());
	timer += 1;
 
}