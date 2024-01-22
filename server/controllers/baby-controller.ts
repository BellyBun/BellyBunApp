import { Request, Response } from "express";
import { BabyModel } from "../models/baby-model";
import { UserModel } from "../models/user-model";
import { assert } from "../errorHandler";

export async function createPregnancy(req: Request, res: Response) {
  // Check if the user is logged in
  if (!req.session || !req.session.user || !req.session.user._id) {
    return res.status(401).json({ message: "Unauthorized. Please log in." });
  }

  const userId = req.session.user._id;

  // Deactivate all existing active babies for the user
  await BabyModel.updateMany(
    { userId, isActive: true },
    { $set: { isActive: false } }
  );

  const babyData = {
    ...req.body,
    userId: userId,
  };

  try {
    const baby = await BabyModel.create(babyData);
    await baby.save();
    await baby.populate("userId");
    return res.status(201).json(baby);
  } catch (error) {
    console.error("Error creating pregnancy:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getBabiesByUser(req: Request, res: Response) {
  const userEmail = req.params.email;
  console.log("User Email:", userEmail);

  const user = await UserModel.findOne({ email: userEmail });
  console.log("Found User:", user);

  assert(user !== null, 404, "User not found");

  const babies = await BabyModel.find({ userId: user?._id }).populate("userId");
  const followedBabies = await BabyModel.find({ _id: { $in: user!.followedBabies } }).populate("userId");

  const allBabies = babies.concat(followedBabies);


  res.json(allBabies);
}

export async function setActiveBaby(req: Request, res: Response) {
  if (!req.session || !req.session.user || !req.session.user._id) {
    return res.status(401).json({ message: "Unauthorized. Please log in." });
  }

  const babyId = req.params.id;

  try {
    // Deactivate all babies for the user
    await BabyModel.updateMany(
      { userId: req.session.user._id },
      { $set: { isActive: false } }
    );

    // Set the specified baby as active
    const updatedBaby = await BabyModel.findByIdAndUpdate(
      babyId,
      { $set: { isActive: true } },
      { new: true }
    );

    if (!updatedBaby) {
      return res.status(404).json({ message: "Baby not found" });
    }

    return res.json(updatedBaby);
  } catch (error) {
    console.error("Error setting active baby:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function shareFollowBaby(req: Request, res: Response) {
  try {
    const babyId = req.params.id;

    const baby = await BabyModel.findOne({
      $or: [
        { _id: babyId },
        { "userId._id": babyId },
      ],
    });

    if (!baby) {
      return res.status(404).json({ message: "Baby not found" });
    }

    const followBabyCode = baby.userId._id.toString(); // Convert ObjectId to string
    console.log("Follow Baby Code:", followBabyCode);

    return res.status(200).json({ followBabyCode });
  } catch (error) {
    console.error("Error sharing baby code:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function followBaby(req: Request, res: Response) {
  try {
    // Check if the user is logged in
    if (!req.session || !req.session.user || !req.session.user._id) {
      return res.status(401).json({ message: "Unauthorized. Please log in." });
    }

    const followBabyCode = req.params.code;

    // Find the baby based on the provided followBabyCode
    const baby = await BabyModel.findOne({
      $or: [
        { _id: followBabyCode },
        { "userId._id": followBabyCode },
      ],
    });

    if (!baby) {
      return res.status(400).json({ message: "Baby not found" });
    }

    // Associate the baby with the logged-in user as a followedBaby
    const userId = req.session.user._id;

    // Add the baby to the user's followedBabies array (assuming followedBabies is an array in the user model)
    const user = await UserModel.findById(userId);
    assert(user !== null, 404, "User not found");

    // Add the baby to the followedBabies array
    if (user) {
      user.followedBabies.push(baby._id);
    
      // Save the updated user
      await user.save();
    } else {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Baby found and associated with user:", followBabyCode, user);

    return res.status(200).json({ message: "Baby successfully followed" });
  } catch (error) {
    console.error("Error following baby:", error);
    return res.status(500).json({ message: "Internal server error follow baby" });
  }
}


// export async function followBaby(req: Request, res: Response) {
//   try {
//     const followBabyCode = req.params.code;

//     const baby = await BabyModel.findOne({
//       $or: [
//         { userId: followBabyCode },
//         { "userId._id": followBabyCode },
//       ],
//     });

//     if (!baby) {
//       return res.status(400).json({ message: "Baby not found" });
//     }

//     console.log("Baby found for followBabyCode:", followBabyCode, baby);

//     return res.status(200).json(baby);
//   } catch (error) {
//     console.error("Error following baby:", error);
//     return res.status(500).json({ message: "Internal server error follow baby" });
//   }
// }

