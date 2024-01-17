import {useState} from 'react'
import "./PostFilter.scss"
import { Select } from "antd";

function PostFilter() {

    const [postheader, setPostHeader] = useState()
    
    const handleCategory = (value) => {
        console.log(value)
        setPostHeader(value)

    }

    const handlefilter = (value) => {
        console.log(value)
    }
  return (
  <div className="postfilter">

    <div className="post-header">
        <div className={`header ${postheader}`}>
            {postheader}
        </div>
    </div>
    <div className="filters">
                <Select className='category-filter'
                  defaultValue={"All"} style={{width: "200px"}}onChange={handleCategory}
                  options={[{
                      label: "Category",
                      options: [
                        {
                          label: "All",
                          value: "All",
                        },
                        {
                          label: "Openjourney",
                          value: "openjourney",
                        },
                        {
                          label: "Anything v4",
                          value: "anything",
                        },
                        {
                          label: "Dall-e",
                          value: "dalle",
                        },
                        {
                            label: "Midjourney",
                            value: "midjourney",
                          },
                      ],
                    },
                  ]}
                />

                <Select className='time-filter'
                  defaultValue={"Recent"} style={{width: "200px",}}onChange={handlefilter}
                  options={[{
                      label: "Sort By",
                      options: [
                        {
                          label: "Recent-Oldest",
                          value: "Recent",
                        },
                        {
                          label: "Oldest-Recent",
                          value: "Oldest",
                        }
                      ],
                    },
                  ]}
                />  
                </div>
            </div>
  )
}

export default PostFilter