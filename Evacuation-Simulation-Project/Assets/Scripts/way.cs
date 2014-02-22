using UnityEngine;
using System.Collections;
using RAIN.Core;
using RAIN.Path;
using RAIN.Action;

public class way : Action {
	private RAIN.Path.RAINPathManager path;

	public override ActionResult Start (Agent agent, float deltaTime) {
		
		//way(
		GameObject wpc = GameObject.Find("Waypoints1");
		
		if (wpc != null )
		{
			path= (RAIN.Path.RAINPathManager)  agent.PathManager;
			
			if (path != null )
			{
				Debug.Log("got here");
				path.waypointCollection = wpc;
				path.ReInit();
			}
			else Debug.Log("nope");
		}
		return ActionResult.SUCCESS;
	}
}