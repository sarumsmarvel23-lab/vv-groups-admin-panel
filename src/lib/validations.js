let onlyString = /^[a-zA-Z\s]+$/;
let onlyNumber = /^\d+$/;
let onlySymbol = /^[!@#\$%\^\&*\)\(+=._-]+$/;
let onlyEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
let onlyPassword = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*\W).{6,18}/;
let onlyEqual = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
let strNum_ = /^[a-zA-Z0-9_]+$/;
let imageFormat = /\.(jpg|JPG|jpeg|JPEG|png|PNG)$/;
let strNum_Space = /^[a-zA-Z0-9_ ]+$/;
let strNum_Space_and_Hyfen = /^[a-zA-Z0-9_ \-]+$/;
let urlRegex =
  /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/i;
// let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const emailRegex =
  /^(?!\s)(?!.*\s$)(?!.*\s)[a-zA-Z0-9.]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
let phoneRegex = /^[0-9+\-()\s]{7,20}$/i;

// Password validation components
let havecaps = /[A-Z]/;
let havesmall = /[a-z]/;
let haveNumber = /\d/;
let haveSymbole = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

const validations = data => {
  if (data && data.length >= 0) {
    let errors = {};

    data.forEach(row => {
      let { field, type, value, matchValue } = row;

      // Check if the field is empty
      if (!value) {
        errors[field] = "Required";
        return;
      }

      // Check for string length > 25
      if (typeof value === "string" && value.length > 25) {
        errors[field] = "Not more than 25 characters";
        return;
      }

      // Validate based on the type of the field
      switch (type) {
        case "string":
          if (!onlyString.test(value)) {
            errors[field] = "Invalid";
          }
          break;
        case "number":
          if (!onlyNumber.test(value)) {
            errors[field] = "Invalid";
          } else if (parseFloat(value) <= 0) {
            errors[field] = "Allow Only Numeric";
          } else {
            errors[field] = "";
          }
          break;
        case "symbol":
          if (!onlySymbol.test(value)) {
            errors[field] = "Invalid";
          }
          break;
        case "email":
          if (!onlyEmail.test(value)) {
            errors[field] = "Invalid";
          }
          break;
        case "password":
          if (!havecaps.test(value)) {
            errors[field] = "At least one uppercase letter";
            return;
          }
          if (!havesmall.test(value)) {
            errors[field] = "At least one lowercase letter";
            return;
          }
          if (!haveNumber.test(value)) {
            errors[field] = "At least one number";
            return;
          }
          if (!haveSymbole.test(value)) {
            errors[field] = "At least one special character";
            return;
          }
          if (value.length < 8) {
            errors[field] = "Not less than 8 characters";
            return;
          }
          if (!onlyPassword.test(value)) {
            errors[field] = "Invalid password";
            return;
          }
          break;
        case "newPassword":
          if (!havecaps.test(value)) {
            errors[field] = "At least one uppercase letter";
            return;
          }
          if (!havesmall.test(value)) {
            errors[field] = "At least one lowercase letter";
            return;
          }
          if (!haveNumber.test(value)) {
            errors[field] = "At least one number";
            return;
          }
          if (!haveSymbole.test(value)) {
            errors[field] = "At least one special character";
            return;
          }
          if (value.length < 8) {
            errors[field] = "Not less than 8 characters";
            return;
          }
          if (!onlyPassword.test(value)) {
            errors[field] = "Invalid password";
            return;
          }
          break;
        case "match":
          if (value !== matchValue) {
            errors[field] = "Passwords do not match";
          }
          break;
        case "equal":
          if (!onlyEqual.test(value)) {
            errors[field] = "Invalid";
          }
          break;
        case "str&Num&_":
          if (!strNum_.test(value)) {
            errors[field] = "Invalid";
          }
          break;
        case "strNum_Space":
          strNum_Space.test(value) === false
            ? (errors[field] = "Invalid")
            : (errors[field] = errors[field] ?? "");
          break;
        case "image":
          if (value.size > 1000000) {
            errors[field] = "Not more than 1MB";
            return;
          }
          if (!imageFormat.test(value.name)) {
            errors[field] = "Invalid file format";
            return;
          }
          break;
        default:
          break;
      }
    });

    return { errors };
  }
};
export default validations;

export const tagNameValidation = data => {
  const errors = {};
  try {
    const { title, status } = data;

    if (!title || typeof title !== "string" || title.trim() === "") {
      errors.title = "Tag name is required";
    } else {
      if (title.length > 50) {
        errors.title = "Tag name cannot exceed 50 characters";
      } else {
        if (!strNum_Space.test(title)) {
          errors.title = "Tag name contains invalid characters";
        }
      }
    }

    if (!status || typeof status !== "string" || status.trim() === "") {
      errors.status = "Status is required";
    } else if (!["active", "deactive"].includes(status.trim().toLowerCase())) {
      errors.status = "Status must be either 'Active' or 'Deactive'";
    }

    return Object.keys(errors).length > 0 ? errors : null;
  } catch (err) {
    console.error("Error in tagNameValidation:", err);
    return errors;
  }
};

export const categoryValidation = data => {
  const errors = {};
  try {
    const { title, status, tags } = data;

    if (!title || typeof title !== "string" || title.trim() === "") {
      errors.title = "Category title is required";
    } else {
      if (title.length > 50) {
        errors.title = "Category title cannot exceed 50 characters";
      } else {
        if (!strNum_Space.test(title)) {
          errors.title = "Category title contains invalid characters";
        }
      }
    }

    if (!status || typeof status !== "string" || status.trim() === "") {
      errors.status = "Status is required";
    } else if (!["active", "deactive"].includes(status.trim().toLowerCase())) {
      errors.status = "Status must be either 'Active' or 'Deactive'";
    }

    if (!Array.isArray(tags)) {
      errors.tags = "Invalid";
    } else if (tags.length < 1) {
      errors.tags = "At least one tag is required";
    }

    return Object.keys(errors).length > 0 ? errors : null;
  } catch (err) {
    console.error("Error in validateInput:", err);
    return errors;
  }
};

export const seriesValidation = data => {
  const errors = {};
  try {
    const { title, status } = data;

    if (!title || typeof title !== "string" || title.trim() === "") {
      errors.title = "Series title is required";
    } else {
      if (title.length > 200) {
        errors.title = "Series title cannot exceed 200 characters";
      } else {
        if (!strNum_Space.test(title)) {
          errors.title = "Series title contains invalid characters";
        }
      }
    }

    if (!status || typeof status !== "string" || status.trim() === "") {
      errors.status = "Status is required";
    } else if (!["active", "deactive"].includes(status.trim().toLowerCase())) {
      errors.status = "Status must be either 'Active' or 'Deactive'";
    }

    return Object.keys(errors).length > 0 ? errors : null;
  } catch (err) {
    console.error("Error in seriesValidation:", err);
    return errors;
  }
};

export function settingsValidation(data) {
  const errors = {};

  try {
    const {
      whatsappLink,
      youtubeLink,
      siteName,
      contactNo,
      emailLogo,
      address,
      supportMail,
    } = data;
    console.log("data: ", data);

    if (!siteName || typeof siteName !== "string" || siteName.trim() === "") {
      errors.siteName = "Site name is required";
    } else if (siteName.length > 50) {
      errors.siteName = "Site name must be under 50 characters";
    }

    if (
      !contactNo ||
      typeof contactNo !== "string" ||
      contactNo.trim() === ""
    ) {
      errors.contactNo = "Contact number is required";
    } else if (contactNo && !phoneRegex.test(contactNo)) {
      errors.contactNo = "Invalid contact number";
    }

    if (!address || typeof address !== "string" || address.trim() === "") {
      errors.address = "Address is required";
    }

    if (!supportMail || !emailRegex.test(supportMail)) {
      errors.supportMail = "Invalid support email";
    }

    const socialLinks = {
      youtubeLink,
      whatsappLink,
    };

    for (const [key, value] of Object.entries(socialLinks)) {
      if (value && !urlRegex.test(value)) {
        const readableKey =
          {
            youtubeLink: "Youtube",
            whatsappLink: "Whatsapp",
          }[key] || key;

        errors[key] = `Invalid ${readableKey} URL`;
      }
    }

    if (!emailLogo) {
      errors.emailLogo = "Site logo is required";
    } else if (
      emailLogo &&
      typeof emailLogo === "object" &&
      emailLogo.name &&
      emailLogo.size
    ) {
      const { name, size } = emailLogo;

      if (!imageFormat.test(name)) {
        errors.emailLogo = "Only JPG, JPEG, PNG formats allowed";
      } else if (size > 1_000_000) {
        errors.emailLogo = "Site logo must be under 1MB";
      }
    }

    return Object.keys(errors).length > 0 ? errors : null;
  } catch (err) {
    console.error("Error in settingsValidation:", err);
    return errors;
  }
};

export const maintainanceValidation = data => {
  const errors = {};
  try {
    const { startDate, endDate } = data;
    if (startDate && endDate) {
      if (new Date(startDate) >= new Date(endDate)) {
        errors.startDate = "Start date must be before end date";
      }
    }
    return Object.keys(errors).length > 0 ? errors : null;
  } catch (err) {
    console.error("Error in maintainanceValidation:", err);
    return {};
  }
};

export const subAdminValidation = (data, type) => {
  const errors = {};
  try {
    if (type && type === "add") {
      const { name, email, password, role } = data;

      if (!name || typeof name !== "string" || name.trim() === "") {
        errors.name = "Name is required";
      } else if (name.length > 50) {
        errors.name = "Name must be under 50 characters";
      }
      // else if (!onlyString.test(name)) {
      //   errors.name = "Name contains invalid characters";
      // }
      if (!password || typeof password !== "string" || password.trim() === "") {
        errors.password = "Password is required";
      } else if (password.length < 8 || password.length > 18) {
        errors.password = "Password must be between 8 and 18 characters";
      } else if (
        !havecaps.test(password) ||
        !havesmall.test(password) ||
        !haveNumber.test(password) ||
        !haveSymbole.test(password)
      ) {
        errors.password =
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
      } else if (!onlyPassword.test(password)) {
        errors.password = "Invalid password format";
      }

      if (!email) {
        errors.email = "Email is required";
      } else if (!emailRegex.test(email)) {
        errors.email = "Invalid email format";

      }

      // if (!role || typeof role !== 'string' || role.trim() === '') {
      //   errors.role = "Role is required";
      // }else if (!['subadmin', 'BD',"adminstaff"].includes(role.trim().toLowerCase())) {
      //   errors.role = "Invalid role.";
      // }
    } else if (type && type === "update") {
      const { name, email, status, password, loginPass } = data;
      const { newPass, confirmPass } = password;
      console.log("confirmPass: ", confirmPass);

      if (!name || typeof name !== "string" || name.trim() === "") {
        errors.name = "Name is required";
      } else if (name.length > 50) {
        errors.name = "Name must be under 50 characters";
      }
      // else if (!onlyString.test(name)) {
      //   errors.name = "Name contains invalid characters";
      // }

      if (!email || !emailRegex.test(email)) {
        errors.email = "Invalid email format";
      }

      if (!status || typeof status !== "string" || status.trim() === "") {
        errors.status = "Status is required";
      } else if (
        !["active", "deactive"].includes(status.trim().toLowerCase())
      ) {
        errors.status = "Status must be either 'active' or 'deactive'";
      }

      // if (!role || typeof role !== 'string' || role.trim() === '') {
      //   errors.role = "Role is required";
      // }else if (!['subadmin', 'BD',"adminstaff"].includes(role.trim().toLowerCase())) {
      //   errors.role = "Invalid role.";
      // }

      // if(confirmPass.length>0){
      //   if (!loginPass || typeof loginPass !== 'string' || loginPass.trim() === '') {
      //     errors.status = "Login Password is required";
      //   }
      // }

      if (newPass && confirmPass) {
        if (newPass.length < 8 || newPass.length > 18) {
          errors.newPass = "New password must be between 8 and 18 characters";
        } else if (
          !havecaps.test(newPass) ||
          !havesmall.test(newPass) ||
          !haveNumber.test(newPass) ||
          !haveSymbole.test(newPass)
        ) {
          errors.newPass =
            "New password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
        } else if (!onlyPassword.test(newPass)) {
          errors.newPass = "Invalid new password format";
        } else if (newPass !== confirmPass) {
          errors.confirmPass = "New password and confirm password do not match";
        }
      }
    }

    return Object.keys(errors).length > 0 ? errors : null;
  } catch (err) {
    console.error("Error in addAdminValidation:", err);
    return errors;
  }
};

export const subModuleValidation = data => {
  const errors = {};
  try {
    const { mainmodule, subModule, status } = data;
    if (
      !mainmodule ||
      typeof mainmodule !== "string" ||
      mainmodule.trim() === ""
    ) {
      errors.mainmodule = "Main module is required";
    }
    if (
      !subModule ||
      typeof subModule !== "string" ||
      subModule.trim() === ""
    ) {
      errors.subModule = "Sub module is required";
    }
    if (!status || typeof status !== "string" || status.trim() === "") {
      errors.status = "Status is required";
    } else if (!["active", "deactive"].includes(status.trim().toLowerCase())) {
      errors.status = "Status must be either 'active' or 'inactive'";
    }
    return Object.keys(errors).length > 0 ? errors : null;
  } catch (err) {
    console.error("Error in subModuleValidation:", err);
    return errors;
  }
};

export const profileValidation = data => {
  const errors = {};
  try {
    const { name, email, password } = data;

    if (!name || typeof name !== "string" || name.trim() === "") {
      errors.name = "Name is required";
    } else if (name.length > 50) {
      errors.name = "Name must be under 50 characters";
    } else if (!onlyString.test(name)) {
      errors.name = "Name contains invalid characters";
    }

    if (!email || !emailRegex.test(email)) {
      errors.email = "Invalid email format";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (password && password.length > 0) {
      if (password.length < 8 || password.length > 18) {
        errors.password = "Password must be between 8 and 18 characters";
      } else if (
        !havecaps.test(password) ||
        !havesmall.test(password) ||
        !haveNumber.test(password) ||
        !haveSymbole.test(password)
      ) {
        errors.password =
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
      } else if (!onlyPassword.test(password)) {
        errors.password = "Invalid password format";
      }
    }

    return Object.keys(errors).length > 0 ? errors : null;
  } catch (err) {
    console.error("Error in profileValidation:", err);
    return errors;
  }
};

export const editEmailTemplateValidation = data => {
  const errors = {};
  try {
    const { identifier, subject, content, langCode, status } = data;

    if (
      !identifier ||
      typeof identifier !== "string" ||
      identifier.trim() === ""
    ) {
      errors.identifier = "Identifier is required";
    }

    if (!subject || typeof subject !== "string" || subject.trim() === "") {
      errors.subject = "Subject is required";
    }

    if (!content || typeof content !== "string" || content.trim() === "") {
      errors.content = "Content is required";
    }

    // if (!langCode || typeof langCode !== 'string' || langCode.trim() === '') {
    //   errors.langCode = "Language code is required";
    // }

    // if (!status || typeof status !== 'string' || status.trim() === '') {
    //   errors.status = "Status is required";
    // } else if (!['active', 'deactive'].includes(status.trim().toLowerCase())) {
    //   errors.status = "Status must be either 'active' or 'deactive'";
    // }

    return Object.keys(errors).length > 0 ? errors : null;
  } catch (err) {
    console.error("Error in editEmailTemplateValidation:", err);
    return errors;
  }
};

export const updateCmsValidation = data => {
  const errors = {};
  try {
    const { identifier, title, content, status } = data;

    if (
      !identifier ||
      typeof identifier !== "string" ||
      identifier.trim() === ""
    ) {
      errors.identifier = "Identifier is required";
    }

    if (!title || typeof title !== "string" || title.trim() === "") {
      errors.title = "Title is required";
    }

    if (!content || typeof content !== "string" || content.trim() === "") {
      errors.content = "Content is required";
    }

    if (!status || typeof status !== "string" || status.trim() === "") {
      errors.status = "Status is required";
    } else if (!["active", "deactive"].includes(status.trim().toLowerCase())) {
      errors.status = "Status must be either 'active' or 'inactive'";
    }

    return Object.keys(errors).length > 0 ? errors : null;
  } catch (err) {
    console.error("Error in updateCmsValidation:", err);
    return errors;
  }
};

export const depositValidate = async reason => {
  let errors = {};

  if (!reason) {
    errors.reason = "Reason is required";
  }

  return errors;
};

export const depositInputValidate = async (reason, name) => {
  let errors = {};

  if (!reason && name == "reason") {
    errors.reason = "Reason is required";
  }

  return errors;
};

export const coinValidation = data => {
  const errors = {};
  try {
    const { image } = data;
    console.log("data: ", data);

    if (!image) {
      errors.image = "Coin Image is required";
    } else if (image && typeof image === "object" && image.name && image.size) {
      const { name, size } = image;

      if (!imageFormat.test(name)) {
        errors.image = "Only JPG, JPEG, PNG formats allowed";
      } else if (size > 1_000_000) {
        errors.image = "Site logo must be under 1MB";
      }
    }

    return Object.keys(errors).length > 0 ? errors : null;
  } catch (err) {
    console.error("Error in settingsValidation:", err);
    return errors;
  }
};

export const withdrawValidate = async reason => {
  let errors = {};

  if (!reason) {
    errors.reason = "Reason is required";
  }

  return errors;
};

export const withdrawInputValidate = async (reason, name) => {
  let errors = {};

  if (!reason && name == "reason") {
    errors.reason = "Reason is required";
  }

  return errors;
};

export const estateValidation = (data) => {
  let errors = {};
  if (!data.title || data.title.trim() === "") errors.title = "Title is required";
  if (!data.description || data.description.trim() === "") errors.description = "Description is required";
  if (!data.price || data.price.trim() === "") errors.price = "Price is required";
  if (!data.location || data.location.trim() === "") errors.location = "Location is required";
  if (data.bedrooms < 0) errors.bedrooms = "Cannot be negative";
  if (data.bathrooms < 0) errors.bathrooms = "Cannot be negative";
  if (data.youtubeLink && !urlRegex.test(data.youtubeLink)) errors.youtubeLink = "Invalid Youtube URL";
  return Object.keys(errors).length > 0 ? errors : null;
};

export const estateInputValidation = (name, value) => {
  let errors = {};
  if (name === "title" && (!value || value.trim() === "")) errors.title = "Title is required";
  if (name === "description" && (!value || value.trim() === "")) errors.description = "Description is required";
  if (name === "price" && (!value || value.trim() === "")) errors.price = "Price is required";
  if (name === "location" && (!value || value.trim() === "")) errors.location = "Location is required";
  if (name === "bedrooms" && value < 0) errors.bedrooms = "Cannot be negative";
  if (name === "bathrooms" && value < 0) errors.bathrooms = "Cannot be negative";
  if (name === "youtubeLink" && value && !urlRegex.test(value)) errors.youtubeLink = "Invalid Youtube URL";
  return errors;
};

export const spiceValidation = (data) => {
  let errors = {};
  if (!data.name || data.name.trim() === "") errors.name = "Name is required";
  if (!data.description || data.description.trim() === "") errors.description = "Description is required";
  if (!data.origin || data.origin.trim() === "") errors.origin = "Origin is required";
  if (!data.grade || data.grade.trim() === "") errors.grade = "Grade is required";
  if (!data.pricePerKg) errors.pricePerKg = "Price per kg is required";
  return Object.keys(errors).length > 0 ? errors : null;
};

export const spiceInputValidation = (name, value) => {
  let errors = {};
  if (name === "name" && (!value || value.trim() === "")) errors.name = "Name is required";
  if (name === "description" && (!value || value.trim() === "")) errors.description = "Description is required";
  if (name === "origin" && (!value || value.trim() === "")) errors.origin = "Origin is required";
  if (name === "grade" && (!value || value.trim() === "")) errors.grade = "Grade is required";
  if (name === "pricePerKg" && !value) errors.pricePerKg = "Price per kg is required";
  return errors;
};

export const stayValidation = (data) => {
  let errors = {};
  if (!data.name || data.name.trim() === "") errors.name = "Name is required";
  if (!data.description || data.description.trim() === "") errors.description = "Description is required";
  if (!data.location || data.location.trim() === "") errors.location = "Location is required";
  if (data.youtubeLink && !urlRegex.test(data.youtubeLink)) errors.youtubeLink = "Invalid Youtube URL";
  return Object.keys(errors).length > 0 ? errors : null;
};

export const stayInputValidation = (name, value) => {
  let errors = {};
  if (name === "name" && (!value || value.trim() === "")) errors.name = "Name is required";
  if (name === "description" && (!value || value.trim() === "")) errors.description = "Description is required";
  if (name === "location" && (!value || value.trim() === "")) errors.location = "Location is required";
  if (name === "price" && (!value || value.trim() === "")) errors.price = "Price is required";
  if (name === "youtubeLink" && value && !urlRegex.test(value)) errors.youtubeLink = "Invalid Youtube URL";
  return errors;
};
