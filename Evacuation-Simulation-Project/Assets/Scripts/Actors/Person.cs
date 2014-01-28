using UnityEngine;
using System.Collections;

public abstract class Person : MonoBehaviour {
	
	public enum Aggression {
		Timid,
		Passive,
		Aggressive
	}

	public enum Age {
		Young,
		MiddleAged,
		Old
	}

	public enum Fitness {
		Unfit,
		Average,
		Fit
	}

	private static System.Random rand = new System.Random();

	private static readonly int youngProbability = 33;
	private static readonly int middleAgedProbability = 66;
	private static readonly int oldProbability = 100;

	private static readonly int timidProbability = 33;
	private static readonly int passiveProbability = 66;
	private static readonly int aggressiveProbability = 100;

	private static readonly int unfitProbability = 33;
	private static readonly int averageProbability = 66;
	private static readonly int fitProbability = 100;

	private Aggression aggression;
	private Age age;
	private Fitness fitness;
	private int probability;
	private bool evacuated;
	private Vector3 exitPoint;
	private Vector3 startPosition;
	private int direction;

	// Use this for initialization
	void Start () {
		this.startPosition = gameObject.transform.position;
		this.evacuated = false;
		calculateNearestExit();
		generatePersonality();
	}
	
	// Update is called once per frame
	void Update () {
	
	}
	
	public void baseStart() {
		Start();
	}

	public void moveLeft() {
		gameObject.transform.Translate(new Vector3(-2f, 0f, 0f), Space.World);
	}

	public void moveRight() {
		gameObject.transform.Translate(new Vector3(2f, 0f, 0f), Space.World);
	}

	public void moveForward() {
		gameObject.transform.Translate(new Vector3(0f, 0f, 1.5f),  Space.World);
	}

	public void moveBackward() {
		gameObject.transform.Translate(new Vector3(0f, 0f, -1.5f), Space.World);
	}

	public void calculateNearestExit() {
		float minDistance = 999999999999f;
		foreach (GameObject exit in GameObject.FindGameObjectsWithTag("Exit")) {
			float distance = Vector3.Distance(gameObject.transform.position, exit.transform.position);
			if (distance < minDistance) {
				minDistance = distance;
				this.exitPoint = exit.transform.position;
			}
		}
		if (gameObject.transform.position.z > exitPoint.z) {
			direction = -1;
		}
		else {
			direction = 1;
		}
	}

	public void resetPosition() {
		gameObject.transform.position = this.startPosition;
	}

	public void generatePersonality(){
		generateAge();
		generateFitnessLevel();
		generateAggressionLevel();
	}

	public void generateAggressionLevel() {
		int aggr = Person.rand.Next(101);

		if (aggr <= Person.timidProbability) {
			this.aggression = Aggression.Timid;
		}
		else if (aggr <= Person.passiveProbability) {
			this.aggression = Aggression.Passive;
		}
		else if (aggr <= Person.aggressiveProbability) {
			this.aggression = Aggression.Aggressive;
		}

		this.probability += (int)this.aggression;
	}

	public Aggression getAggressionLevel() {
		return this.aggression;
	}

	public void setAggressionLevel(Aggression aggression) {
		this.aggression = aggression;
	}
	
	public void generateAge() {
		int age = Person.rand.Next(101);

		if (age <= Person.youngProbability) {
			this.age = Age.Young;
		}
		else if (age <= Person.middleAgedProbability) {
			this.age = Age.MiddleAged;
		}
		else if (age <= Person.oldProbability) {
			this.age = Age.Old;
		}

		this.probability += (int)this.age;
	}

	public Age getAge() {
		return this.age;
	}

	public void setAge(Age age) {
		this.age = age;
	}

	public void generateFitnessLevel() {
		int fitness = Person.rand.Next(101);

		if (fitness <= Person.unfitProbability) {
			this.fitness = Fitness.Unfit;
		}
		else if (fitness <= Person.averageProbability) {
			this.fitness = Fitness.Average;
		}
		else if (fitness <= Person.fitProbability) {
			this.fitness = Fitness.Fit;
		}

		this.probability += (int)this.fitness;
	}

	public Fitness getFitnessLevel() {
		return this.fitness;
	}

	public void setFitnessLevel(Fitness fitness) {
		this.fitness = fitness;
	}

	public int getProbability() {
		return this.probability;
	}

	public void setProbabilty(int probability) {
		this.probability = probability;
	}

	public void setEvacuated(bool evacuated) {
		this.evacuated = evacuated;
	}

	public bool isEvacuated() {
		return this.evacuated;
	}	
}
