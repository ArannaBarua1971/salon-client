import SalonServiceCard from "../components/salonService/SalonServiceCard"

const data = [
  {
    "_id": "service001",
    "serviceName": "Classic Haircut",
    "category": "Haircut & Styling",
    "description": "Professional haircut with styling to give you a fresh and elegant look.",
    "price": 500,
    "duration": 45,
    "image": "https://images.unsplash.com/photo-1560066984-138dadb4c035",
    "status": true
  },
  {
    "_id": "service002",
    "serviceName": "Hair Coloring",
    "category": "Hair Coloring",
    "description": "Premium hair coloring service using high-quality products.",
    "price": 2500,
    "duration": 120,
    "image": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e",
    "status": true
  },
  {
    "_id": "service003",
    "serviceName": "Keratin Treatment",
    "category": "Hair Treatment",
    "description": "Smooth and nourish your hair with our professional keratin treatment.",
    "price": 3500,
    "duration": 150,
    "image": "https://images.unsplash.com/photo-1519699047748-de8e457a634e",
    "status": true
  },
  {
    "_id": "service004",
    "serviceName": "Premium Facial",
    "category": "Facial & Skincare",
    "description": "Deep cleansing facial treatment for glowing and healthy skin.",
    "price": 1200,
    "duration": 60,
    "image": "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881",
    "status": true
  },
  {
    "_id": "service005",
    "serviceName": "Bridal Makeup",
    "category": "Makeup",
    "description": "Complete bridal makeup with a professional and long-lasting finish.",
    "price": 8000,
    "duration": 180,
    "image": "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2",
    "status": true
  },
  {
    "_id": "service006",
    "serviceName": "Manicure & Pedicure",
    "category": "Manicure & Pedicure",
    "description": "Relaxing nail care service including cleaning, shaping and polishing.",
    "price": 1500,
    "duration": 75,
    "image": "https://images.unsplash.com/photo-1604654894610-df63bc536371",
    "status": false
  }
]
function page() {
  return (
     <div> <div className="service cards px-20">
          <div className="grid grid-cols-3 gap-10">
            {data.map((d) => (
              <SalonServiceCard key={d._id} service={d} />
            ))}
          </div>
        </div>
        </div>
  )
}

export default page