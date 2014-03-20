using UnityEngine;
using System.Collections;
using RAIN.Core;
using RAIN.Path;
using RAIN.Action;

public class Destroy : Action {

	public override ActionResult Start (Agent agent, float deltaTime){
		Debug.Log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");


		Vector3 pos = agent.Avatar.transform.position;
		//if (pos == agent.actionContext.GetContextItem<string>("door"))
			Debug.Log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"+agent.actionContext.GetContextItem<string>("door"));
		return ActionResult.SUCCESS;
	}
}
