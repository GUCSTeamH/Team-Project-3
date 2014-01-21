using UnityEngine;
using System.Collections;

public class Manager : MonoBehaviour {
	
	private GameObject[] passengers;
	private static bool paused;
	private static readonly float aisleCoordZ = 18f;

	// Use this for initialization
	void Start () {
		Manager.paused = true;
		passengers = GameObject.FindGameObjectsWithTag("Passenger");
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	public static void setPaused(bool paused) {
		Manager.paused = paused;
	}

	public static bool isPaused() {
		return Manager.paused;
	}

	public static float getAisleCoordZ() {
		return Manager.aisleCoordZ;
	}
}
