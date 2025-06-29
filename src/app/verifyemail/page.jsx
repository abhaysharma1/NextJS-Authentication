
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  useEffect(() => {
    const url = new URLSearchParams(window.location.search);
    const urltoken = url.get("token");
    setToken(urltoken || "");
  }, []);

  return (
    <div className="flex justify-center items-center h-[100vh] w-[100vw]">
      <div>
        <h1 className="text-4xl">Verify Email</h1>
        <h2 className="p-2 bg-orange-600">{token ? `${token}` : "No Token"}</h2>

        {verified ? (
          <div>
            <h2 className="text-2xl text-green-700">Email Verified</h2>
            <Link href="/login" className="text-purple-700">
              Login
            </Link>
          </div>
        ) : (
          ""
        )}

        {error ? (
          <div>
            <h2 className="text-2xl text-red-800">Error</h2>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
