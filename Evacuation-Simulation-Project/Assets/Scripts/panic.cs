//action script used in the behaviour tree for the people with anxiety behaviour


//script makes use of the RAIN{Indie} plugin for Unity3D, found at : http://rivaltheory.com/rain/
using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using RAIN.Core;
using RAIN.Action;

public class panic : RAIN.Action.Action
{ bool flag = false;
	Vector3 no;
	public closestDoor script;
	public panic()
	{
		actionName = "panic";
	}

	public override RAIN.Action.Action.ActionResult Execute(RAIN.Core.Agent agent, float deltaTime)
	{
		//get position of passenger, if he has not moved to a random position yet (boolean flag)
		//get the random destination from the action context, move him there
		Vector3 pos = agent.Avatar.transform.position;
		if (flag == false ){
			no = agent.actionContext.GetContextItem<Vector3>("newpos");
			flag =true;
		}
		agent.MoveTo(no, deltaTime);

		//check if he has reached random destination; if so, move to closest door
		if (Mathf.Abs((int) no.x - (int) pos.x) <=1  && Mathf.Abs((int) no.z - ((int) pos.z))<=1) {
			script =(closestDoor) agent.Avatar.gameObject.GetComponent("closestDoor");
			script.calculateDoor();
			no = agent.actionContext.GetContextItem<Vector3>("door");
			agent.MoveTo(no, deltaTime);
		}
		return RAIN.Action.Action.ActionResult.FAILURE;
	}
}