import { Button, Card, CardBody, CardHeader, Checkbox, Typography } from "@material-tailwind/react";
import axios from "axios";
import { Input } from "postcss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    const Login = async () => {
        try {
            const response = await axios.post('http://localhost:3000/user/login', formData)
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('uid', response.data._id)
            window.location.href = '/'
        } catch (err) {
            console.log(err)
            setError('Login failed. Please check your credentials.')
        }
    }
    return (
        <div>
            <Card className="w-96 mx-auto mt-10">
                <CardBody className="flex flex-col gap-4 p-6">
                    <Typography variant="h2" color="blue-gray" className="">
                        Login
                    </Typography>
                    <form className="flex flex-col gap-4">
                        <div>
                            <Typography variant="h6" className="mb-2">
                                Enter your email
                            </Typography>
                            <input
                                type="email"
                                placeholder="Email"
                                value={formData.email}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                        <div>
                            <Typography variant="h6" className="mb-2">
                                Enter password
                            </Typography>
                            <input
                                type="password"
                                placeholder="Password"
                                value={formData.password}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>
                        <div className="mt-6">
                            <Button
                                onClick={() => Login()}
                                className="w-full"
                                color="blue"
                            >
                                Login
                            </Button>
                        </div>
                    </form>
                </CardBody>
            </Card>
        </div>
    )
}

export default Login