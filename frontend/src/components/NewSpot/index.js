import React from "react";
import "./NewSpot.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
    createSpot,
    getSpot,
    thunkCreateImageForSpot,
} from "../../store/spots";

function CreateNewForm() {
    const history = useHistory();
    const dispatch = useDispatch();

    const [country, setCountry] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [description, setDescription] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [preview, setPreview] = useState("");
    const [urlOne, setUrlOne] = useState("");
    const [urlTwo, setUrlTwo] = useState("");
    const [urlThree, setUrlThree] = useState("");
    const [urlFour, setUrlFour] = useState("");
    const [errors, setErrors] = useState({});

    const updateCountry = (e) => setCountry(e.target.value);
    const updateAddress = (e) => setAddress(e.target.value);
    const updateCity = (e) => setCity(e.target.value);
    const updateState = (e) => setState(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updateName = (e) => setName(e.target.value);
    const updatePrice = (e) => setPrice(e.target.value);
    const updatePreview = (e) => setPreview(e.target.value);
    const updateUrlOne = (e) => setUrlOne(e.target.value);
    const updateUrlTwo = (e) => setUrlTwo(e.target.value);
    const updateUrlThree = (e) => setUrlThree(e.target.value);
    const updateUrlFour = (e) => setUrlFour(e.target.value);

    function checkErrors(
        address,
        city,
        state,
        country,
        name,
        description,
        price,
        preview,
        urlOne,
        urlTwo,
        urlThree,
        urlFour
    ) {
        const errorsObj = {};
        if (address.length < 4) errorsObj["address"] = "Address is required.";
        if (city.length < 1) errorsObj["city"] = "City is required.";
        if (state.length < 1) errorsObj["state"] = "State is required.";
        if (country.length < 2) errorsObj["country"] = "Country is required.";
        if (name.length < 1) errorsObj["name"] = "Name is required.";
        if (description.length < 30)
            errorsObj["description"] = "Description needs 30 or more characters.";
        if (description.length > 250)
            errorsObj['description'] = 'Description cannot exceed 250 characters.'
        if (price <= 0) errorsObj["price"] = "Price per night is required.";
        if (price >= 9999) errorsObj['priceMax'] = 'Price cannot exceed $9999';
        if (preview.length < 1) errorsObj["previewLength"] = "Preview image is required.";
        if (
            preview.toLowerCase().endsWith(".png") ||
            preview.toLowerCase().endsWith(".jpeg") ||
            preview.toLowerCase().endsWith(".jpg")
        ) {

        } else {
            errorsObj["previewEnd"] = 'Preview image URL must end in .png, .jpg, or .jpeg'
        }
        if (urlOne) {
            if (
                urlOne.toLowerCase().endsWith(".png") ||
                urlOne.toLowerCase().endsWith(".jpeg") ||
                urlOne.toLowerCase().endsWith(".jpg")
            ) {
            } else {
                errorsObj["urlOne"] = "Image URL must end in .png, .jpg, or .jpeg";
            }
        }
        if (urlTwo) {
            if (
                urlTwo.toLowerCase().endsWith(".png") ||
                urlTwo.toLowerCase().endsWith(".jpeg") ||
                urlTwo.toLowerCase().endsWith(".jpg")
            ) {
            } else {
                errorsObj["urlTwo"] = "Image URL must end in .png, .jpg, or .jpeg";
            }
        }
        if (urlThree) {
            if (
                urlThree.toLowerCase().endsWith(".png") ||
                urlThree.toLowerCase().endsWith(".jpeg") ||
                urlThree.toLowerCase().endsWith(".jpg")
            ) {
            } else {
                errorsObj["urlThree"] = "Image URL must end in .png, .jpg, or .jpeg";
            }
        }
        if (urlFour) {
            if (
                urlFour.toLowerCase().endsWith(".png") ||
                urlFour.toLowerCase().endsWith(".jpeg") ||
                urlFour.toLowerCase().endsWith(".jpg")
            ) {
            } else {
                errorsObj["urlFour"] = "Image URL must end in .png, .jpg, or .jpeg";
            }
        }

        return errorsObj;
    }
    // hard code lat/long values because its optional
    const lat = 11;
    const lng = 14;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const foundErrors = checkErrors(
            address,
            city,
            state,
            country,
            name,
            description,
            price,
            preview,
            urlOne,
            urlTwo,
            urlThree,
            urlFour
        );

        setErrors(foundErrors);
        if (Object.values(foundErrors).length > 0) {
            return null;
        }

        const payload = {
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price,
        };
        const newSpot = await dispatch(createSpot(payload));
        await dispatch(thunkCreateImageForSpot(newSpot.id, preview, true));
        await dispatch(thunkCreateImageForSpot(newSpot.id, urlOne, false));
        await dispatch(thunkCreateImageForSpot(newSpot.id, urlTwo, false));
        await dispatch(thunkCreateImageForSpot(newSpot.id, urlThree, false));
        await dispatch(thunkCreateImageForSpot(newSpot.id, urlFour, false));

        if (newSpot) {
            dispatch(getSpot(newSpot.id));
            history.push(`/spots/${newSpot.id}`);
        }
    };

    return (
        <div className="form-container">
            <h1 className="form-header">Create a New Spot</h1>
            <h2 className="form-header2">Where's your place located?</h2>
            <p className="form-header3">
                Guests will only get your exact address once they booked a reservation.
            </p>

            <form onSubmit={handleSubmit}>
                <div class="form-errorcontainer">
                    <label>Country</label>
                    {errors.country && <p className="form-errors">{errors.country}</p>}
                </div>
                <input
                    type="text"
                    name="Country"
                    value={country}
                    onChange={updateCountry}
                    placeholder="Country"
                />

                <div className="form-errorcontainer">
                    <label>Street Address</label>
                    {errors.address && (
                        <p className="form-errors address">{errors.address}</p>
                    )}
                </div>
                <input
                    type="text"
                    name="Address"
                    value={address}
                    onChange={updateAddress}
                    placeholder="Address"
                />

                <div className="form-citystate-container">
                    <div className="form-citystate  form-city">
                        <div className="form-errorcontainer">
                            <label>City</label>
                            {errors.city && <p className="form-errors city">{errors.city}</p>}
                        </div>
                        <input
                            type="text"
                            name="city"
                            value={city}
                            onChange={updateCity}
                            placeholder="City"
                        />
                    </div>

                    <div className="form-citystate">
                        <div className="form-errorcontainer">
                            <label>State</label>
                            {errors.state && (
                                <p className="form-errors state">{errors.state}</p>
                            )}
                        </div>
                        <input
                            type="text"
                            name="state"
                            value={state}
                            onChange={updateState}
                            placeholder="STATE"
                        />
                    </div>
                </div>

                <div className="form-line"></div>

                <h2 className="form-header2">Describe your place to guests</h2>
                <p className="form-header3">
                    Mention the best features of your space, any special amentities like
                    fast wifi or parking, and what you love about the neighborhood.
                </p>
                {errors.description && (
                    <p className="form-errors description">{errors.description}</p>
                )}
                <textarea
                    className="form-textarea"
                    value={description}
                    onChange={updateDescription}
                    placeholder="Please write at least 30 characters"
                />

                <div className="form-line"></div>

                <label className="form-header2">Create a title for your spot</label>
                <p className="form-header3">
                    Catch guests' attention with a spot title that highlights what makes your
                    place special.
                </p>

                {errors.name && <p className="form-errors name">{errors.name}</p>}
                <input
                    className="form-name"
                    type="text"
                    name="name"
                    value={name}
                    onChange={updateName}
                    placeholder="Name of your spot"
                />

                <div className="form-line"></div>

                <label className="form-header2">Set a base price for your spot</label>
                <p className="form-header3">
                    Competitive pricing can help your listing stand out and rank higher in
                    search results.
                </p>
                <div className="form-pricecontainer">
                    <i class="fa-solid fa-dollar-sign"></i>
                    <input
                        className="form-price"
                        type="number"
                        name="price"
                        value={price}
                        onChange={updatePrice}
                        placeholder="Price per night (USD)"
                    />
                    {errors.price && <p className="form-errors price">{errors.price}</p>}
                    {errors.priceMax && <p className="form-errors price">{errors.priceMax}</p>}
                </div>

                <div className="form-line"></div>

                <label className="form-header2">Liven up your spot with photos</label>
                <p className="form-header3">
                    Submit a link to at least one photo to publish your spot.
                </p>
                <div className="form-urlcontainer">
                    {errors.previewLength && (
                        <p className="form-errors preview">{errors.previewLength}</p>
                    )}
                    {errors.previewEnd && (
                        <p className="form-errors preview">{errors.previewEnd}</p>
                    )}
                    <input
                        className="form-previewurl"
                        type="url"
                        name="previewURL"
                        value={preview}
                        onChange={updatePreview}
                        placeholder="Preview Image URL"
                    />

                    {errors.urlOne && (
                        <p className="form-errors form-url">{errors.urlOne}</p>
                    )}
                    <input
                        className="form-url"
                        type="url"
                        name="additionalURL"
                        value={urlOne}
                        onChange={updateUrlOne}
                        placeholder="Image URL"
                    />

                    {errors.urlTwo && (
                        <p className="form-errors form-url">{errors.urlTwo}</p>
                    )}
                    <input
                        className="form-url"
                        type="url"
                        name="additionalURL"
                        value={urlTwo}
                        onChange={updateUrlTwo}
                        placeholder="Image URL"
                    />

                    {errors.urlThree && (
                        <p className="form-errors form-url">{errors.urlThree}</p>
                    )}
                    <input
                        className="form-url"
                        type="url"
                        name="additionalURL"
                        value={urlThree}
                        onChange={updateUrlThree}
                        placeholder="Image URL"
                    />

                    {errors.urlFour && (
                        <p className="form-errors form-url last-url">{errors.urlFour}</p>
                    )}
                    <input
                        className="form-url"
                        type="url"
                        name="additionalURL"
                        value={urlFour}
                        onChange={updateUrlFour}
                        placeholder="Image URL"
                    />
                </div>

                <div className="form-line"></div>

                <button className="form-submitbutton" type="submit">
                    Create Spot
                </button>
            </form>
        </div>
    );
}

export default CreateNewForm;
