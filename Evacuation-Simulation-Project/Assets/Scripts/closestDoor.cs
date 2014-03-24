
using UnityEngine;
using System.Collections;
using RAIN.Core;
using RAIN.Action;
using System.Collections.Generic;
public class closestDoor : MonoBehaviour {
	public Vector3 targetPosition;
	public string att;
	public getDoors doorScript;

	public List<GameObject> doorslist;
	

	public void calculateDoor(){
		Vector3 positionMiddle = new Vector3((float)17.56, transform.position.y, transform.position.z);

		GameObject plane = GameObject.FindGameObjectWithTag("plane");
		doorScript =(getDoors) plane.GetComponent("getDoors");
		doorslist = doorScript.doorslist;
		Debug.Log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"+doorslist.Count);

		float minDistance = Vector3.Distance(transform.position, doorslist[0].transform.position);
		string doorName=doorslist[0].name;
		targetPosition = doorslist[0].transform.position;


		string doorName2 = null;
		Vector3 targetPosition2 = new Vector3(0,0,0);
		int i=1;
		while (i<doorslist.Count){
			float distance=Vector3.Distance(transform.position, doorslist[i].transform.position);
			float distance2=Vector3.Distance(positionMiddle, doorslist[i].transform.position);
			if (distance < minDistance){
				doorName=doorslist[i].name;
				minDistance=distance;
				targetPosition=doorslist[i].transform.position;
				if (distance2 < distance){
					doorName2=doorslist[i].name;
					targetPosition2=doorslist[i].transform.position;
				}
			}


			i++;
		}
		
		RAINAgent ai=GetComponent<RAINAgent>();
		if (ai!=null){
			if (Random.Range(0, 100) < 50 && doorName2 != null){
				Debug.Log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
				ai.Agent.actionContext.SetContextItem<Vector3>("door", targetPosition2);
				ai.Agent.actionContext.SetContextItem<string>("doorName", doorName2);
			}
			else {

				ai.Agent.actionContext.SetContextItem<Vector3>("door", targetPosition);
				ai.Agent.actionContext.SetContextItem<string>("doorName", doorName);
			}
			Debug.Log("****************************************"+ai.Agent.actionContext.GetContextItem<string>("doorName"));
			string type = ai.Agent.actionContext.GetContextItem<string>("type");
			
			if (type == "altruism"){
				Debug.Log ("trigpass");
				this.gameObject.AddComponent("trigPass");
			}
		}
		else print ("null");
		//print(ai.Agent.actionContext.GetContextItem<string>("door"));
		
	}
}