/*
 * Script attached to every passenger object
 * Script that calculates a passenger's closest door. It calculates two distances,
 * one from the initial position, and one from the middle of the walkable aisle.
 * It does so as at some point, a passenger may notice that a door is closer than the
 * one he has initially percieved as closest.
 * If the doors are different, which door will be chosen is determined
 * by a random number generator, making the decision to choose the initial door
 * 50% probable.
 * */
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
		//calculates closest door from the middle of the aisle
		Vector3 positionMiddle = new Vector3((float)17.56, transform.position.y, transform.position.z);

		//get the position of all the doors in the model
		GameObject plane = GameObject.FindGameObjectWithTag("plane");

		//get list of doors from script that allows adding and removing of doors
		doorScript =(getDoors) plane.GetComponent("getDoors");
		doorslist = doorScript.doorslist;

		//calculate and assign an initial door
		float minDistance = Vector3.Distance(transform.position, doorslist[0].transform.position);
		string doorName=doorslist[0].name;
		targetPosition = doorslist[0].transform.position;


		string doorName2 = null;
		Vector3 targetPosition2 = new Vector3(0,0,0);
		int i=1;

		//going through all the doors in the list, calculate which is closer
		while (i<doorslist.Count){
			float distance=Vector3.Distance(transform.position, doorslist[i].transform.position);
			float distance2=Vector3.Distance(positionMiddle, doorslist[i].transform.position);
			//if distance is less than minimum distance, assign a new closest door
			if (distance < minDistance){
				doorName=doorslist[i].name;
				minDistance=distance;
				targetPosition=doorslist[i].transform.position;
				//if the distance from the middle of the aisle is less than the one
				//calculated above, keep track of doorname and position
				if (distance2 < distance){
					doorName2=doorslist[i].name;
					targetPosition2=doorslist[i].transform.position;
				}
			}
			i++;
		}
		
		RAINAgent ai=GetComponent<RAINAgent>();
		if (ai!=null){
			//generate a random number
			if (Random.Range(0, 100) < 50 && doorName2 != null){
				//if number is  < 50 and there is a closer door, assign it to the passenger
				ai.Agent.actionContext.SetContextItem<Vector3>("door", targetPosition2);
				ai.Agent.actionContext.SetContextItem<string>("doorName", doorName2);
			}
			else {
				//add the initial door
				ai.Agent.actionContext.SetContextItem<Vector3>("door", targetPosition);
				ai.Agent.actionContext.SetContextItem<string>("doorName", doorName);
			}
			string type = ai.Agent.actionContext.GetContextItem<string>("type");

			//add trigger script to passenger if he is of type "altruism"
			if (type == "altruism"){
				Debug.Log ("trigpass");
				this.gameObject.AddComponent("trigPass");
			}
		}
		else print ("null");		
	}
}