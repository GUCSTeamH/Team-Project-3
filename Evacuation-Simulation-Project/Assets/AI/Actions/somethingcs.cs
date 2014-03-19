using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using RAIN.Core;
using RAIN.Action;

public class somethingcs : RAIN.Action.Action
{ bool flag = false;
	Vector3 no;
	public somethingcs()
	{
		actionName = "somethingcs";
	}
	public override RAIN.Action.Action.ActionResult Start(RAIN.Core.Agent agent, float deltaTime){
		return RAIN.Action.Action.ActionResult.FAILURE;
	}
	
	
	public override RAIN.Action.Action.ActionResult Execute(RAIN.Core.Agent agent, float deltaTime)
	{
		Vector3 pos = agent.Avatar.transform.position;
		//Debug.Log("*******************************************"+pos);
		//RAIN.Path.PathManager path = agent.PathManager;
		//path.moveTarget = no;
		if (flag == false ){
			Debug.Log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
			no = agent.actionContext.GetContextItem<Vector3>("newpos");
			flag =true;
		}
		agent.MoveTo(no, deltaTime);
		//Debug.Log((int)no.x+"*******************************************"+(int)pos.x);
		Debug.Log((int)no.y+"*******************************************"+(int)pos.y);
		Debug.Log((int)no.z+"*******************************************"+(int)pos.z);
		if (Mathf.Abs((int) no.x - (int) pos.x) <=1  && Mathf.Abs((int) no.z - ((int) pos.z))<=1) {
			no = agent.actionContext.GetContextItem<Vector3>("door");
			agent.MoveTo(no, deltaTime);
		}
		return RAIN.Action.Action.ActionResult.FAILURE;
	}
	public override RAIN.Action.Action.ActionResult Stop(RAIN.Core.Agent agent, float deltaTime)
	{
		return RAIN.Action.Action.ActionResult.FAILURE;
	}
	
	
}