const { Contact } = require("../service/schemas/contact");
const HttpError = require("../Helpers/HttpError");

const get = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;

    const { page = 1, limit = 10, favorite } = req.query;

    const skip = (page - 1) * limit;

    const filter = { owner };

    if (favorite === "true") {
      filter.favorite = true;
    } else if (favorite === "false") {
      filter.favorite = false;
    }

    const result = await Contact.find(filter, "-createdAt -updatedAt", {
      skip,
      limit,
    }).populate("owner", "name email");

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const findById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findOne({ _id: contactId });
    if (!contact) {
      throw new HttpError(404, "Not found user");
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

const addNewContact = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;

    const result = await Contact.create({ ...req.body, owner });

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const contact = await Contact.findByIdAndRemove({ _id: contactId });
    if (!contact) {
      throw new HttpError(404, "Not found user");
    }

    res.status(200).send({ message: "contact deleted" }).json(contact);
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { name, email, phone, favorite } = req.body;

    const contact = await Contact.findByIdAndUpdate(
      { _id: contactId },
      { name, email, phone, favorite },
      { new: true }
    );

    if (!contact) {
      throw new HttpError(404, "Not found user");
    }

    res.json(contact);
  } catch (error) {
    next(error);
  }
};

const updateStatusContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;
    const contact = await Contact.findByIdAndUpdate(
      { _id: contactId },
      { favorite },
      { new: true }
    );

    if (!contact) {
      throw new HttpError(400, "Not found user");
    }

    res.json(contact);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  get,
  findById,
  addNewContact,
  deleteContact,
  updateContact,
  updateStatusContact,
};
