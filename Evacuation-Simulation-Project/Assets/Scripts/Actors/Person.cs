using UnityEngine;
using System.Collections;


/// <summary>
/// Base abstract class for a Person in the simulation.
/// </summary>
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
	
	/// <summary>
	/// Public function that can be called by subclasses due to the parent Start() function not being implicitely called by subclasses
	/// </summary>
	public void baseStart() {
		Start();
	}

	/// <summary>
	/// Moves object to the left.
	/// </summary>
	public void moveLeft() {
		gameObject.transform.Translate(new Vector3(-2f, 0f, 0f), Space.World);
	}

	/// <summary>
	/// Moves object to the right.
	/// </summary>
	public void moveRight() {
		gameObject.transform.Translate(new Vector3(2f, 0f, 0f), Space.World);
	}

	/// <summary>
	/// Moves object forward.
	/// </summary>
	public void moveForward() {
		gameObject.transform.Translate(new Vector3(0f, 0f, 1.5f),  Space.World);
	}

	/// <summary>
	/// Moves object backward.
	/// </summary>
	public void moveBackward() {
		gameObject.transform.Translate(new Vector3(0f, 0f, -1.5f), Space.World);
	}

	/// <summary>
	/// Calculates the nearest exit(Object in level tagged as "Exit").
	/// </summary>
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

	/// <summary>
	/// Resets the position of the object.
	/// </summary>
	public void resetPosition() {
		gameObject.transform.position = this.startPosition;
	}

	/// <summary>
	/// Generates the personality(aggression, fitness and age).
	/// </summary>
	public void generatePersonality(){
		generateAge();
		generateFitnessLevel();
		generateAggressionLevel();
	}

	/// <summary>
	/// Generates the aggression level.
	/// </summary>
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

	/// <summary>
	/// Gets the aggression level.
	/// </summary>
	/// <returns>The aggression level.</returns>
	public Aggression getAggressionLevel() {
		return this.aggression;
	}

	/// <summary>
	/// Sets the aggression level.
	/// </summary>
	/// <param name="aggression">Aggression.</param>
	public void setAggressionLevel(Aggression aggression) {
		this.aggression = aggression;
	}
	
	/// <summary>
	/// Generates the age.
	/// </summary>
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

	/// <summary>
	/// Gets the age.
	/// </summary>
	/// <returns>The age.</returns>
	public Age getAge() {
		return this.age;
	}

	/// <summary>
	/// Sets the age.
	/// </summary>
	/// <param name="age">Age.</param>
	public void setAge(Age age) {
		this.age = age;
	}

	/// <summary>
	/// Generates the fitness level.
	/// </summary>
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

	/// <summary>
	/// Gets the fitness level.
	/// </summary>
	/// <returns>The fitness level.</returns>
	public Fitness getFitnessLevel() {
		return this.fitness;
	}

	/// <summary>
	/// Sets the fitness level.
	/// </summary>
	/// <param name="fitness">Fitness.</param>
	public void setFitnessLevel(Fitness fitness) {
		this.fitness = fitness;
	}

	/// <summary>
	/// Gets the probability.
	/// </summary>
	/// <returns>The probability.</returns>
	public int getProbability() {
		return this.probability;
	}

	/// <summary>
	/// Sets the probabilty.
	/// </summary>
	/// <param name="probability">Probability.</param>
	public void setProbabilty(int probability) {
		this.probability = probability;
	}

	/// <summary>
	/// Sets evacuation status of object.
	/// </summary>
	/// <param name="evacuated">If set to <c>true</c> object has evacuated.</param>
	public void setEvacuated(bool evacuated) {
		this.evacuated = evacuated;
	}

	/// <summary>
	/// Returns evacuation status of object.
	/// </summary>
	/// <returns><c>true</c>, if object has evacuated, <c>false</c> otherwise.</returns>
	public bool isEvacuated() {
		return this.evacuated;
	}	
}
