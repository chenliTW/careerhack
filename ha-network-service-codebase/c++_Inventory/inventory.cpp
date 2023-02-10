#include "crow.h" 
#include<algorithm>
#include <stdexcept>

static const char* base64_chars_ = {
             "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
             "abcdefghijklmnopqrstuvwxyz"
             "0123456789"
             "+/"};

std::string base64_encode(unsigned char const* bytes_to_encode, size_t in_len) {
	
    size_t len_encoded = (in_len +2) / 3 * 4;

    unsigned char trailing_char = '=';

    std::string ret;
    ret.reserve(len_encoded);

    unsigned int pos = 0;

    while (pos < in_len) {
        ret.push_back(base64_chars_[(bytes_to_encode[pos + 0] & 0xfc) >> 2]);

        if (pos+1 < in_len) {
           ret.push_back(base64_chars_[((bytes_to_encode[pos + 0] & 0x03) << 4) + ((bytes_to_encode[pos + 1] & 0xf0) >> 4)]);

           if (pos+2 < in_len) {
              ret.push_back(base64_chars_[((bytes_to_encode[pos + 1] & 0x0f) << 2) + ((bytes_to_encode[pos + 2] & 0xc0) >> 6)]);
              ret.push_back(base64_chars_[  bytes_to_encode[pos + 2] & 0x3f]);
           }
           else {
              ret.push_back(base64_chars_[(bytes_to_encode[pos + 1] & 0x0f) << 2]);
              ret.push_back(trailing_char);
           }
        }
        else {

            ret.push_back(base64_chars_[(bytes_to_encode[pos + 0] & 0x03) << 4]);
            ret.push_back(trailing_char);
            ret.push_back(trailing_char);
        }

        pos += 3;
    }
    return ret;
}

static std::string cal(int x) {
	std::string s=std::to_string(x);
	return base64_encode(reinterpret_cast<const unsigned char*>(s.data()), s.length());
}


int main()
{
    crow::SimpleApp app;

    CROW_ROUTE(app, "/api/material").methods("POST"_method)
    ([](const crow::request& req) {
    	auto x = crow::json::load(req.body);
    	crow::json::wvalue ret({});
    	ret["signature"] = cal(x["a"].i()+x["b"].i()+x["c"].i()+x["d"].i());
    	ret["material"] = x["a"].i()*3+x["b"].i()*2+x["c"].i()*4+x["d"].i()*10;
        return crow::response(ret);
    });

    app.port(8200).multithreaded().run();
    return 0;
}
