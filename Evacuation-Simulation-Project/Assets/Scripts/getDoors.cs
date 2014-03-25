//script attached to the Airplane game object
//stores all the exit doors in an array, after looking for them by their "Door" tag
//allows add / remove door, according to user needs

using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class getDoors : MonoBehaviour {
	public GameObject[] doors;
	public List<GameObject> doorslist;

	//when program is started, get all the doors and store them in the array
	void Start () {
		doors = GameObject.FindGameObjectsWithTag("Door");
		for (int x=0; x<doors.Length; x++) doorslist.Add(doors[x]);
	}

	//add door to the array(in case it was previously disabled and the user changed his mind)
	public void addDoor(GameObject door) {
		doorslist.Add(door);
	}

	//check if there are at least 2 doors in the array
	//if true, remove selected door
	//if false, return false 
	public bool removeDoor(GameObject door) {
		if (doorslist.Count >1 ){
			doorslist.Remove(door);
			return true;
		}
		return false;

	}

}
