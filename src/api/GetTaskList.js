import { MOCK_BACKEND, SERVER_URL } from "../constants";

function mockGetTaskList(token) {
  return {"tasks": [
    {
      "audio_filename": "3sentences-2022_03_14_09_11_30",
      "data_path": "/project/asr_systems/LT2022/data/EN/datoid",
      "date_time": "2022-03-14T09:11:30Z",
      "file_size": 3046552,
      "language": "en",
      "status": "done",
      "task_id": "344c770c-c12c-4075-903d-7d0547b3b45d",
      "task_name": "3sentences.wav",
    },
    {
      "audio_filename": "4sentences-2022_03_16_15_23_11",
      "data_path": "/project/asr_systems/LT2022/data/EN/datoid",
      "date_time": "2022-03-16T15:23:11Z",
      "file_size": 3046552,
      "language": "en",
      "status": "done",
      "task_id": "51c77e4f-4222-4e59-95f4-139f25c57e8d",
      "task_name": "4sentences.wav",
    }
  ],
  "assignedTasks": [
    {
      "audio_filename": "5sentences-2022_03_14_09_11_30",
      "data_path": "/project/asr_systems/LT2022/data/EN/datoid",
      "date_time": "2022-03-14T09:11:30Z",
      "file_size": 3046552,
      "language": "en",
      "status": "done",
      "task_id": "344c770c-c12c-4075-903d-7d0547b3b45d",
      "task_name": "5sentences.wav",
    },
    {
      "audio_filename": "6sentences-2022_03_16_15_23_11",
      "data_path": "/project/asr_systems/LT2022/data/EN/datoid",
      "date_time": "2022-03-16T15:23:11Z",
      "file_size": 3046552,
      "language": "en",
      "status": "done",
      "task_id": "51c77e4f-4222-4e59-95f4-139f25c57e8d",
      "task_name": "6sentences.wav",
    }
  ]};
}



/**
 * get tasks api
 * returns an array of the tasks if succeeded
 * otherwise false
 */
 export default async function getTaskList(token)
 {
     if (MOCK_BACKEND) {
       return mockGetTaskList(token);
     }
     let response;
     var myHeaders = new Headers();
     myHeaders.append("Authorization", "Token "+token);

     
     var requestOptions = {
       method: 'GET',
       headers: myHeaders,
       redirect: 'follow'
     };  
     response = await fetch(SERVER_URL + "/v1/gettasks/", requestOptions);
     
     if(response.status === 200)
         return response.json()
     return false;
     
 }