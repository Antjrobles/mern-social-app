import User from '../models/User';


/* READ */

export const getUser = async (req, res) => {
    try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);

    } catch (error) {
        return res.status(404).json({ message: error.message });
    }


export const getUserFriends = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
        use.friends.map((id) => User.findById(id))
    );

}
