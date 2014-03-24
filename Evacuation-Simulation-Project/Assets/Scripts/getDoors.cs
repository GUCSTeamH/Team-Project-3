using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class getDoors : MonoBehaviour {
	public GameObject[] doors;
	public List<GameObject> doorslist;
	// Use this for initialization
	void Start () {
	
		doors = GameObject.FindGameObjectsWithTag("Door");
		for (int x=0; x<doors.Length; x++) doorslist.Add(doors[x]);

		Debug.Log(doorslist.Count);

	}

	public void addDoor(GameObject door) {

		doorslist.Add(door);
		Debug.Log(doorslist.Count);

	}

	public void removeDoor(GameObject door) {
		if (doorslist.Count >1 ){
			doorslist.Remove(door);
			Debug.Log(doorslist.Count);
		}
		else Debug.Log("one door needs to be open at all times");

	}

}
