using UnityEngine;
using System.Collections;

public class Passenger : Person {

	private bool betweenSeats;

	// Use this for initialization
	void Start () {
		base.baseStart();
	}
	
	// Update is called once per frame
	void Update () {
		if (!Manager.isPaused() && !isEvacuated()) {

		}
	}

	public void setBetweenSeats(bool betweenSeats) {
		this.betweenSeats = betweenSeats;
	}

	public bool isBetweenSeats() {
		return this.betweenSeats;
	}
}
