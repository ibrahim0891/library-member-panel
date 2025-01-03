import { Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import { Star } from "@phosphor-icons/react";




export default function BookCard({ book }) {
    return (
        <div>
            <Card className="">
                <CardHeader floated={false} color="blue-gray aspect-[1/2]">
                    <img src={'https://www.picmaker.com/assets/images/bookcovermaker/template-1.png'} alt={book.title} />
                    <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
                </CardHeader>
                <CardBody>
                    <div className="mb-3 flex flex-col items-center justify-between">
                        <Typography variant="h5" color="blue-gray" className="font-medium">
                            {book.title}
                        </Typography>
                        <Typography variant="small" color="blue-gray" className="font-medium">
                            by - {book.author}
                        </Typography>
                        <Typography color="blue-gray" className="flex items-center gap-1.5 font-normal">
                            <Typography color="blue-gray" className="font-normal">
                                {Math.round(book.rating)+'.0'}
                            </Typography>
                            {
                                [1, 2, 3, 4, 5].map((item) => (
                                    <Star key={item} weight={item <= Math.round(book.rating) ? "fill" : "regular"} className={item <= Math.round(book.rating) ? "text-yellow-700" : ""} />
                                ))
                            }
                        </Typography>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}