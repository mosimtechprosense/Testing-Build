
const successResponse = (res, message = "Success", data = null, status = 200) => {
    return res.status(status).json({
        success: true,
        message,
        count: Array.isArray(data) ? data.length : undefined,
        data,
    });
};

export default successResponse;