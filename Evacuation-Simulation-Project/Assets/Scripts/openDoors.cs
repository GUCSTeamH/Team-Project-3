using UnityEngine;
using System.Collections;

public class openDoors : MonoBehaviour {

	// Use this for initialization
	void onStart () {
		Debug.Log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
		StartCoroutine(Wait());
	}

	IEnumerator Wait(){
		yield return new WaitForSeconds(17);
		GameObject[] exits = GameObject.FindGameObjectsWithTag("Exit");
		for (int i=0; i<exits.Length; i++){
			Debug.Log(exits[i].name);
			exits[i].AddComponent("trig");
		}
	}
	

}
