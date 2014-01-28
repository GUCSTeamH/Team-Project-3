using UnityEngine;
using System.Collections;

public class CrewMember : Person {

	// Use this for initialization
	void Start () {
		base.baseStart();
	}
	
	// Update is called once per frame
	void Update () {
		if (!Manager.isPaused() && !isEvacuated()) {

		}
	}
}
