import cookie from "cookie"

export default (req, res) => {
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", req.body.token, {
        maxAge: 3600,
        path: "/",
      })
    );
    res.statusCode = 200;
    res.json({ success: true });
};