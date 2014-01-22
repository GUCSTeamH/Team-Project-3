var cubeRenderer: Renderer;

function OnGUI()
{
	var buttonName:String = "The cube is ";
	if(cubeRenderer.material.color == Color.red)
		buttonName += "Red!";
	else
	 	buttonName += "White!";
	if(GUI.Button(Rect(0,0,200,100),buttonName))
	{
		if(cubeRenderer.material.color == Color.red)
			cubeRenderer.material.color = Color.blue;
		else
			cubeRenderer.material.color = Color.red;
		
	}
}