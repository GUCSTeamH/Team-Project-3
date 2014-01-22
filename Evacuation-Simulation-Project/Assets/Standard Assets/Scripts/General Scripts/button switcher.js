private var width = 200;
private var height = 50;
private var spacing = 25;

function OnGUI()
{
GUILayout.BeginArea(Rect(Screen.width/2-width/2, Screen.height/2-height/2, width,400));
if(GUILayout.Button("Scene1",GUILayout.Height(height)))

{
	Application.LoadLevel("scene1");
}

GUILayout.Space(spacing);
if(GUILayout.Button("Scene2",GUILayout.Height(height)))

{
	Application.LoadLevel("scene2");
}
}