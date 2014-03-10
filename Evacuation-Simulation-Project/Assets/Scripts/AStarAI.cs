﻿using UnityEngine;
using System.Collections;
//Note this line, if it is left out, the script won't know that the class 'Path' exists and it will throw compiler errors
//This line should always be present at the top of scripts which use pathfinding
using Pathfinding;
public class AStarAI : MonoBehaviour {
    //The point to move to
    public Vector3 targetPosition;
	
	public GameObject closestDoor;
    
    private Seeker seeker;
    private CharacterController controller;
 
    //The calculated path
    public Path path;
    
    //The AI's speed per second
    public float speed = 100;
    
    //The max distance from the AI to a waypoint for it to continue to the next waypoint
    public float nextWaypointDistance = 3;
 
    //The waypoint we are currently moving towards
    private int currentWaypoint = 0;
 
    public void Start () {
		
		GameObject[] doors = GameObject.FindGameObjectsWithTag("Door");
		setClosest(doors);

		
		
        seeker = GetComponent<Seeker>();
        controller = GetComponent<CharacterController>();
        
		
        //Start a new path to the targetPosition, return the result to the OnPathComplete function
        seeker.StartPath (transform.position,targetPosition, OnPathComplete);
    }
	
	//function that sets the target position for each person
	public void setClosest(GameObject[] doors){
		float minDistance = Vector3.Distance(transform.position, doors[0].transform.position);
		string doorName=doors[0].name;
		GameObject door=doors[0];
		int i=1;
		while (i<doors.Length){
			float distance=Vector3.Distance(transform.position, doors[i].transform.position);
			if (distance < minDistance){
				doorName=doors[i].name;
				minDistance=distance;
				door=doors[i];
			}
			i++;
		}
		targetPosition=door.transform.position;
		//print ("test door");
		//print (name);
		//print ("test"+door.name);
		
	}
    
    public void OnPathComplete (Path p) {
        //Debug.Log ("Yey, we got a path back. Did it have an error? "+p.error);
        if (!p.error) {
            path = p;
            //Reset the waypoint counter
            currentWaypoint = 0;
        }
    }
 
    public void FixedUpdate () {
		
		if (path == null) {
            //We have no path to move after yet
            return;
        }
        
        if (currentWaypoint >= path.vectorPath.Count) {
            Debug.Log ("End Of Path Reached");
			Destroy(this.gameObject);
            return;
        }
        
		
        //Direction to the next waypoint
        Vector3 dir = (path.vectorPath[currentWaypoint]-transform.position).normalized;
        dir *= speed * Time.fixedDeltaTime;
        controller.SimpleMove (dir);
        
        //Check if we are close enough to the next waypoint
        //If we are, proceed to follow the next waypoint
        if (Vector3.Distance (transform.position,path.vectorPath[currentWaypoint]) < nextWaypointDistance) {
            currentWaypoint++;
            return;
        }
    }
		
}